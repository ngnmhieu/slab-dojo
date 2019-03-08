package de.otto.teamdojo.web.rest;
import de.otto.teamdojo.service.TrainingService;
import de.otto.teamdojo.web.rest.errors.BadRequestAlertException;
import de.otto.teamdojo.web.rest.util.HeaderUtil;
import de.otto.teamdojo.web.rest.util.PaginationUtil;
import de.otto.teamdojo.service.dto.TrainingDTO;
import de.otto.teamdojo.service.dto.TrainingCriteria;
import de.otto.teamdojo.service.TrainingQueryService;
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
 * REST controller for managing Training.
 */
@RestController
@RequestMapping("/api")
public class TrainingResource {

    private final Logger log = LoggerFactory.getLogger(TrainingResource.class);

    private static final String ENTITY_NAME = "training";

    private final TrainingService trainingService;

    private final TrainingQueryService trainingQueryService;

    public TrainingResource(TrainingService trainingService, TrainingQueryService trainingQueryService) {
        this.trainingService = trainingService;
        this.trainingQueryService = trainingQueryService;
    }

    /**
     * POST  /trainings : Create a new training.
     *
     * @param trainingDTO the trainingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new trainingDTO, or with status 400 (Bad Request) if the training has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/trainings")
    public ResponseEntity<TrainingDTO> createTraining(@Valid @RequestBody TrainingDTO trainingDTO) throws URISyntaxException {
        log.debug("REST request to save Training : {}", trainingDTO);
        if (trainingDTO.getId() != null) {
            throw new BadRequestAlertException("A new training cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrainingDTO result = trainingService.save(trainingDTO);
        return ResponseEntity.created(new URI("/api/trainings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /trainings : Updates an existing training.
     *
     * @param trainingDTO the trainingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated trainingDTO,
     * or with status 400 (Bad Request) if the trainingDTO is not valid,
     * or with status 500 (Internal Server Error) if the trainingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/trainings")
    public ResponseEntity<TrainingDTO> updateTraining(@Valid @RequestBody TrainingDTO trainingDTO) throws URISyntaxException {
        log.debug("REST request to update Training : {}", trainingDTO);
        if (trainingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrainingDTO result = trainingService.save(trainingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, trainingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /trainings : get all the trainings.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of trainings in body
     */
    @GetMapping("/trainings")
    public ResponseEntity<List<TrainingDTO>> getAllTrainings(TrainingCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Trainings by criteria: {}", criteria);
        Page<TrainingDTO> page = trainingQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/trainings");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * GET  /trainings/count : count all the trainings.
    *
    * @param criteria the criterias which the requested entities should match
    * @return the ResponseEntity with status 200 (OK) and the count in body
    */
    @GetMapping("/trainings/count")
    public ResponseEntity<Long> countTrainings(TrainingCriteria criteria) {
        log.debug("REST request to count Trainings by criteria: {}", criteria);
        return ResponseEntity.ok().body(trainingQueryService.countByCriteria(criteria));
    }

    /**
     * GET  /trainings/:id : get the "id" training.
     *
     * @param id the id of the trainingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the trainingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/trainings/{id}")
    public ResponseEntity<TrainingDTO> getTraining(@PathVariable Long id) {
        log.debug("REST request to get Training : {}", id);
        Optional<TrainingDTO> trainingDTO = trainingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trainingDTO);
    }

    /**
     * DELETE  /trainings/:id : delete the "id" training.
     *
     * @param id the id of the trainingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/trainings/{id}")
    public ResponseEntity<Void> deleteTraining(@PathVariable Long id) {
        log.debug("REST request to delete Training : {}", id);
        trainingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
