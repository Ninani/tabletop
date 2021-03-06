package tabletop.controllers.event.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import tabletop.domain.match.tournament.Tournament;
import tabletop.domain.match.tournament.TournamentType;
import tabletop.domain.user.User;

import java.util.Optional;

class EventTournamentDto extends EventMatchDto {
    private final String name;
    private final TournamentType type;
    private final Boolean finished;

    EventTournamentDto(Tournament tournament, Optional<User> user, User organiser) {
        super(tournament.getId(), tournament.getStartDate(), tournament.getEndDate(), tournament.getUsers(), tournament.getGame(), tournament.getMinPlayers(), tournament.getMaxPlayers(), tournament.getPending(), tournament.getDiscarded(), user, organiser);
        this.name = tournament.getName();
        this.type = tournament.getType();
        this.finished = tournament.isFinished();
    }

    public String getName() {
        return name;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public TournamentType getType() {
        return type;
    }

    public Boolean getFinished() {
        return finished;
    }
}
