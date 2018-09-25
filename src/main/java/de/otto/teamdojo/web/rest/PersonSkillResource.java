package de.otto.teamdojo.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.otto.teamdojo.service.PersonSkillService;
import de.otto.teamdojo.web.rest.errors.BadRequestAlertException;
import de.otto.teamdojo.web.rest.util.HeaderUtil;
import de.otto.teamdojo.web.rest.util.PaginationUtil;
import de.otto.teamdojo.service.dto.PersonSkillDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PersonSkill.
 */
@RestController
@RequestMapping("/api")
public class PersonSkillResource {

    private final Logger log = LoggerFactory.getLogger(PersonSkillResource.class);

    private static final String ENTITY_NAME = "personSkill";

    private final PersonSkillService personSkillService;

    public PersonSkillResource(PersonSkillService personSkillService) {
        this.personSkillService = personSkillService;
    }

    /**
     * POST  /person-skills : Create a new personSkill.
     *
     * @param personSkillDTO the personSkillDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personSkillDTO, or with status 400 (Bad Request) if the personSkill has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/person-skills")
    @Timed
    public ResponseEntity<PersonSkillDTO> createPersonSkill(@Valid @RequestBody PersonSkillDTO personSkillDTO) throws URISyntaxException {
        log.debug("REST request to save PersonSkill : {}", personSkillDTO);
        if (personSkillDTO.getId() != null) {
            throw new BadRequestAlertException("A new personSkill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PersonSkillDTO result = personSkillService.save(personSkillDTO);
        return ResponseEntity.created(new URI("/api/person-skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /person-skills : Updates an existing personSkill.
     *
     * @param personSkillDTO the personSkillDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated personSkillDTO,
     * or with status 400 (Bad Request) if the personSkillDTO is not valid,
     * or with status 500 (Internal Server Error) if the personSkillDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/person-skills")
    @Timed
    public ResponseEntity<PersonSkillDTO> updatePersonSkill(@Valid @RequestBody PersonSkillDTO personSkillDTO) throws URISyntaxException {
        log.debug("REST request to update PersonSkill : {}", personSkillDTO);
        if (personSkillDTO.getId() == null) {
            return createPersonSkill(personSkillDTO);
        }
        PersonSkillDTO result = personSkillService.save(personSkillDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personSkillDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /person-skills : get all the personSkills.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of personSkills in body
     */
    @GetMapping("/person-skills")
    @Timed
    public ResponseEntity<List<PersonSkillDTO>> getAllPersonSkills(Pageable pageable) {
        log.debug("REST request to get a page of PersonSkills");
        Page<PersonSkillDTO> page = personSkillService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/person-skills");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /person-skills/:id : get the "id" personSkill.
     *
     * @param id the id of the personSkillDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personSkillDTO, or with status 404 (Not Found)
     */
    @GetMapping("/person-skills/{id}")
    @Timed
    public ResponseEntity<PersonSkillDTO> getPersonSkill(@PathVariable Long id) {
        log.debug("REST request to get PersonSkill : {}", id);
        Optional<PersonSkillDTO> personSkillDTO = personSkillService.findOne(id);
        return ResponseUtil.wrapOrNotFound(personSkillDTO);
    }

    /**
     * DELETE  /person-skills/:id : delete the "id" personSkill.
     *
     * @param id the id of the personSkillDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/person-skills/{id}")
    @Timed
    public ResponseEntity<Void> deletePersonSkill(@PathVariable Long id) {
        log.debug("REST request to delete PersonSkill : {}", id);
        personSkillService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
