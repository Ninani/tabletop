package tabletop.controllers.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import tabletop.controllers.utils.ResponseUtils;
import tabletop.controllers.validation.errors.ControllerErrors;
import tabletop.domain.event.Event;
import tabletop.domain.event.Location;
import tabletop.services.event.EventService;
import tabletop.services.event.LocationService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/events")
public class EventController {
    @Autowired
    private EventValidator validator;
    @Autowired
    private EventService eventService;
    @Autowired
    private LocationService locationService;

    @GetMapping
    public ResponseEntity<?> getEvents(
            @RequestParam(required = false) Double lat, @RequestParam(required = false) Double lng, @RequestParam(required = false) Integer radius,
            @RequestParam(required = false) List<String> games,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long startDate, @RequestParam(required = false) Long endDate) {
        ControllerErrors errors = new ControllerErrors();

        validator.validateLocationFilters(lat, lng, radius, errors);
        validator.validateGames(games, errors);
        validator.validateTypeFilter(type, errors);
        validator.validateDateFilters(startDate, endDate, errors);

        return errors.areErrors() ? ResponseUtils.badRequest(errors) : ResponseEntity.ok(eventService.getEvents(lat, lng, radius, games, type, startDate, endDate));
    }

    @PutMapping("/{pathVariableId}")
    public ResponseEntity<?> updateEvent(@Valid @RequestBody Event event, BindingResult bindingResult, @PathVariable String pathVariableId) {
        ControllerErrors errors = new ControllerErrors(bindingResult);

        validator.validatePathVariableIsId(pathVariableId, errors);

        if (errors.areErrors()) {
            return ResponseUtils.badRequest(errors);
        }

        Long id = Long.valueOf(pathVariableId);

        Optional<Event> existingEvent = eventService.getEventById(id);
        validator.validateExistingEvent(existingEvent, errors);

        validateEvent(event, errors);
        validateAndHandleLocation(event, bindingResult, errors);

        return errors.areErrors() ? ResponseUtils.badRequest(errors) : ResponseEntity.ok(eventService.updateEvent(id, event));
    }

    @PostMapping
    public ResponseEntity<?> createEvent(@Valid @RequestBody Event event, BindingResult bindingResult) {
        ControllerErrors errors = new ControllerErrors(bindingResult);

        if (errors.areErrors()) {
            return ResponseUtils.badRequest(errors);
        }

        validateEvent(event, errors);
        validateAndHandleLocation(event, bindingResult, errors);

        return errors.areErrors() ? ResponseUtils.badRequest(errors) : ResponseUtils.created(eventService.createEvent(event));
    }

    private void validateEvent(Event event, ControllerErrors errors) {
        validator.validateMatches(event, errors);
        validator.validateSparringsGameInformation(event, errors);
        validator.validateTournaments(event, errors);
        validator.validateOrganiserIsNotSet(event, errors);
    }

    private void validateAndHandleLocation(Event event, BindingResult bindingResult, ControllerErrors errors) {
        Location location = event.getLocation();

        if (isNewLocation(location)) {
            validator.validateNewLocation(location, bindingResult);
            errors.addBindingResultErrorMessages(bindingResult);

            if (errors.noErrors()) {
                locationService.addLocation(location);
            }
        } else {
            Optional<Location> existingLocation = locationService.getLocationById(location.getId());
            validator.validateExistingLocation(existingLocation, errors);

            if (errors.noErrors()) {
                event.setLocation(existingLocation.get());
            }
        }
    }

    private boolean isNewLocation(Location location) {
        return location.getId() == null;
    }
}
