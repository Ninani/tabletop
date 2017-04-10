package tabletop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import tabletop.domain.events.Event;
import tabletop.services.EventsService;

import java.util.List;

/**
 * Created by Kuba on 2017-04-09.
 */
@Controller
public class EventController {
    private EventsService eventService;

    @Autowired
    public void setEventsService(EventsService eventService) {
        this.eventService = eventService;
    }

    @RequestMapping(value = "/getevents", method = RequestMethod.GET)
    public @ResponseBody List<Event> getEvents(Model model) {
        List<Event> events = eventService.getEvents();
        model.addAttribute("events", events);
        return events;
    }

    @RequestMapping(value = "/addevent", method = RequestMethod.POST)
    public void addEvent(@RequestBody Event event) {
        eventService.addEvent(event);
    }

    @RequestMapping(value = "/geteventbyname", method = RequestMethod.GET)
    public @ResponseBody Event getEventByName(String name) {
        return eventService.getEventByName(name);
    }
}
