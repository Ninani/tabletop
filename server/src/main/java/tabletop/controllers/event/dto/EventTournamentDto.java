package tabletop.controllers.event.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import tabletop.domain.match.tournament.Tournament;
import tabletop.domain.match.tournament.TournamentType;

class EventTournamentDto extends EventMatchDto {
    private final String name;
    private final TournamentType type;

    EventTournamentDto(Tournament tournament) {
        super(tournament.getId(), tournament.getStartDate(), tournament.getEndDate(), tournament.getUsers(), tournament.getGame(), tournament.getMinPlayers(), tournament.getMaxPlayers(), tournament.getPending(), tournament.getDiscarded());
        this.name = tournament.getName();
        this.type = tournament.getType();
    }

    public String getName() {
        return name;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public TournamentType getType() {
        return type;
    }
}
