package tabletop.services;

import org.springframework.stereotype.Service;
import tabletop.domain.exceptions.BadRequestException;
import tabletop.domain.exceptions.ErrorInfo;
import tabletop.domain.match.tournament.Pair;
import tabletop.domain.match.tournament.Tournament;
import tabletop.domain.match.tournament.TournamentFinalResult;
import tabletop.domain.match.tournament.TournamentType;
import tabletop.domain.match.tournament.swiss.SwissPlayerResult;
import tabletop.domain.match.tournament.swiss.SwissTournamentProcess;
import tabletop.domain.user.User;
import tabletop.repositories.TournamentFinalResultRepository;
import tabletop.repositories.match.tournament.TournamentRepository;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Service
public class TournamentService {

    private TournamentRepository tournamentRepository;
    private TournamentFinalResultRepository tournamentFinalResultRepository;
    private SwissTournamentService swissTournamentService;

    public TournamentService(
            TournamentRepository tournamentRepository,
            TournamentFinalResultRepository tournamentFinalResultRepository,
            SwissTournamentService swissTournamentService
    ) {
        this.tournamentRepository = tournamentRepository;
        this.tournamentFinalResultRepository = tournamentFinalResultRepository;
        this.swissTournamentService = swissTournamentService;
    }

    public Tournament getTournamentById(Long tournamentId) {
        return tournamentRepository
                .findOneById(tournamentId)
                .orElseThrow(() -> new BadRequestException(ErrorInfo.TOURNAMENT_NOT_FOUND));
    }

    public void addTournament(Tournament tournament) {
        tournamentRepository.save(tournament);
    }

    public void deleteById(Long tournamentId) {
        tournamentRepository.findOneById(tournamentId).ifPresent(u -> {
            tournamentRepository.delete(u);
        });
    }

    public Collection<Tournament> getFinishedTournaments() {
        return tournamentRepository.findTournamentsByFinishedIsTrue();
    }

    public Collection<TournamentFinalResult> getFinalResultsForTournament(Long tournamentId) {
        Tournament tournament = tournamentRepository
                .findOneById(tournamentId)
                .orElseThrow(() -> new BadRequestException(ErrorInfo.TOURNAMENT_NOT_FOUND));

        return tournamentFinalResultRepository.findByTournamentOrderByPlace(tournament);

    }

    public List<Pair<User>> getInitialRound(Tournament tournament) {
        if (tournament.getType() == TournamentType.SWISS) {
            return swissTournamentService.getInitialPairs(((SwissTournamentProcess) tournament.getTournamentProcess()));
        }
        return null;
    }

    public void setWinner(Tournament tournament, User winner) {
        if (tournament.getType() == TournamentType.SWISS) {
            swissTournamentService.setWinner(((SwissTournamentProcess) tournament.getTournamentProcess()), winner);
        }
    }

    public Map<Pair<User>, Integer> getCurentState(Tournament tournament) {
        if (tournament.getType() == TournamentType.SWISS) {
            return swissTournamentService.getCurentState(((SwissTournamentProcess) tournament.getTournamentProcess()));
        }
        return null;
    }

    public List<Pair<User>> getNextRound(Tournament tournament) {
        if (tournament.getType() == TournamentType.SWISS) {
            SwissTournamentProcess swissTournamentProcess = (SwissTournamentProcess) tournament.getTournamentProcess();

            if (swissTournamentService.canBeFinished(swissTournamentProcess)){
                tournament.setFinished(true);
                tournamentRepository.save(tournament);
            }

            return swissTournamentService.getNextPair((swissTournamentProcess));
        }
        return null;
    }

    public void setFinalResults(Tournament tournament){
        if (tournament.getType() == TournamentType.SWISS) {
            SwissTournamentProcess swissTournamentProcess = (SwissTournamentProcess) tournament.getTournamentProcess();
            for (SwissPlayerResult swissPlayerResult: swissTournamentProcess.getPlayerResults()) {
                TournamentFinalResult tournamentFinalResult = new TournamentFinalResult();
                tournamentFinalResult.setTournament(tournament);
                tournamentFinalResult.setUser(swissPlayerResult.getId().getUser());
                tournamentFinalResult.setPoints(swissPlayerResult.getResult());
                tournamentFinalResult.setPlace(1);

                tournamentFinalResultRepository.save(tournamentFinalResult);
            }
        }
    }
}
