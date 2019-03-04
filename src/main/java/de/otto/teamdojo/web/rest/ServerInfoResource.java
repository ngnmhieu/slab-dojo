package de.otto.teamdojo.web.rest;

import de.otto.teamdojo.service.dto.ServerInfoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;

/**
 * REST controller for providing information about the server instance.
 */
@RestController
@RequestMapping("/api")
public class ServerInfoResource {

    private final Logger log = LoggerFactory.getLogger(ServerInfoResource.class);

    /**
     * GET  /server/info : provide information concerning the server instance.
     *
     * @param request the HTTP request
     * @return the login if the user is authenticated
     */
    @GetMapping("/server/info")
    public ServerInfoDTO getServerTime(HttpServletRequest request) {
        log.debug("REST request for server time");
        ServerInfoDTO serverInfo = new ServerInfoDTO();
        serverInfo.setTime(Instant.now());
        return serverInfo;
    }
}
