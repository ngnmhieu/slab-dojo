package de.otto.teamdojo.web.rest;

import de.otto.teamdojo.TeamdojoApp;

import de.otto.teamdojo.domain.Training;
import de.otto.teamdojo.domain.Skill;
import de.otto.teamdojo.repository.TrainingRepository;
import de.otto.teamdojo.service.TrainingService;
import de.otto.teamdojo.service.dto.TrainingDTO;
import de.otto.teamdojo.service.mapper.TrainingMapper;
import de.otto.teamdojo.web.rest.errors.ExceptionTranslator;
import de.otto.teamdojo.service.dto.TrainingCriteria;
import de.otto.teamdojo.service.TrainingQueryService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


import static de.otto.teamdojo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TrainingResource REST controller.
 *
 * @see TrainingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TeamdojoApp.class)
public class TrainingResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_PERSON = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_PERSON = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "https://v.W.mvR";
    private static final String UPDATED_LINK = "tw.hv.C-;";

    private static final Instant DEFAULT_VALID_UNTIL = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VALID_UNTIL = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_IS_OFFICIAL = false;
    private static final Boolean UPDATED_IS_OFFICIAL = true;

    private static final String DEFAULT_SUGGESTED_BY = "AAAAAAAAAA";
    private static final String UPDATED_SUGGESTED_BY = "BBBBBBBBBB";

    @Autowired
    private TrainingRepository trainingRepository;

    @Mock
    private TrainingRepository trainingRepositoryMock;

    @Autowired
    private TrainingMapper trainingMapper;

    @Mock
    private TrainingService trainingServiceMock;

    @Autowired
    private TrainingService trainingService;

    @Autowired
    private TrainingQueryService trainingQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTrainingMockMvc;

    private Training training;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrainingResource trainingResource = new TrainingResource(trainingService, trainingQueryService);
        this.restTrainingMockMvc = MockMvcBuilders.standaloneSetup(trainingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Training createEntity(EntityManager em) {
        Training training = new Training()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .contactPerson(DEFAULT_CONTACT_PERSON)
            .link(DEFAULT_LINK)
            .validUntil(DEFAULT_VALID_UNTIL)
            .isOfficial(DEFAULT_IS_OFFICIAL)
            .suggestedBy(DEFAULT_SUGGESTED_BY);
        return training;
    }

    @Before
    public void initTest() {
        training = createEntity(em);
    }

    @Test
    @Transactional
    public void createTraining() throws Exception {
        int databaseSizeBeforeCreate = trainingRepository.findAll().size();

        // Create the Training
        TrainingDTO trainingDTO = trainingMapper.toDto(training);
        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingDTO)))
            .andExpect(status().isCreated());

        // Validate the Training in the database
        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeCreate + 1);
        Training testTraining = trainingList.get(trainingList.size() - 1);
        assertThat(testTraining.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testTraining.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTraining.getContactPerson()).isEqualTo(DEFAULT_CONTACT_PERSON);
        assertThat(testTraining.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testTraining.getValidUntil()).isEqualTo(DEFAULT_VALID_UNTIL);
        assertThat(testTraining.isIsOfficial()).isEqualTo(DEFAULT_IS_OFFICIAL);
        assertThat(testTraining.getSuggestedBy()).isEqualTo(DEFAULT_SUGGESTED_BY);
    }

    @Test
    @Transactional
    public void createTrainingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainingRepository.findAll().size();

        // Create the Training with an existing ID
        training.setId(1L);
        TrainingDTO trainingDTO = trainingMapper.toDto(training);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Training in the database
        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setTitle(null);

        // Create the Training, which fails.
        TrainingDTO trainingDTO = trainingMapper.toDto(training);

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingDTO)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsOfficialIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingRepository.findAll().size();
        // set the field null
        training.setIsOfficial(null);

        // Create the Training, which fails.
        TrainingDTO trainingDTO = trainingMapper.toDto(training);

        restTrainingMockMvc.perform(post("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingDTO)))
            .andExpect(status().isBadRequest());

        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrainings() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList
        restTrainingMockMvc.perform(get("/api/trainings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(training.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].contactPerson").value(hasItem(DEFAULT_CONTACT_PERSON.toString())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())))
            .andExpect(jsonPath("$.[*].validUntil").value(hasItem(DEFAULT_VALID_UNTIL.toString())))
            .andExpect(jsonPath("$.[*].isOfficial").value(hasItem(DEFAULT_IS_OFFICIAL.booleanValue())))
            .andExpect(jsonPath("$.[*].suggestedBy").value(hasItem(DEFAULT_SUGGESTED_BY.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTrainingsWithEagerRelationshipsIsEnabled() throws Exception {
        TrainingResource trainingResource = new TrainingResource(trainingServiceMock, trainingQueryService);
        when(trainingServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTrainingMockMvc = MockMvcBuilders.standaloneSetup(trainingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTrainingMockMvc.perform(get("/api/trainings?eagerload=true"))
        .andExpect(status().isOk());

        verify(trainingServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTrainingsWithEagerRelationshipsIsNotEnabled() throws Exception {
        TrainingResource trainingResource = new TrainingResource(trainingServiceMock, trainingQueryService);
            when(trainingServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTrainingMockMvc = MockMvcBuilders.standaloneSetup(trainingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTrainingMockMvc.perform(get("/api/trainings?eagerload=true"))
        .andExpect(status().isOk());

            verify(trainingServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTraining() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get the training
        restTrainingMockMvc.perform(get("/api/trainings/{id}", training.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(training.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.contactPerson").value(DEFAULT_CONTACT_PERSON.toString()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()))
            .andExpect(jsonPath("$.validUntil").value(DEFAULT_VALID_UNTIL.toString()))
            .andExpect(jsonPath("$.isOfficial").value(DEFAULT_IS_OFFICIAL.booleanValue()))
            .andExpect(jsonPath("$.suggestedBy").value(DEFAULT_SUGGESTED_BY.toString()));
    }

    @Test
    @Transactional
    public void getAllTrainingsByTitleIsEqualToSomething() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where title equals to DEFAULT_TITLE
        defaultTrainingShouldBeFound("title.equals=" + DEFAULT_TITLE);

        // Get all the trainingList where title equals to UPDATED_TITLE
        defaultTrainingShouldNotBeFound("title.equals=" + UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void getAllTrainingsByTitleIsInShouldWork() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where title in DEFAULT_TITLE or UPDATED_TITLE
        defaultTrainingShouldBeFound("title.in=" + DEFAULT_TITLE + "," + UPDATED_TITLE);

        // Get all the trainingList where title equals to UPDATED_TITLE
        defaultTrainingShouldNotBeFound("title.in=" + UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void getAllTrainingsByTitleIsNullOrNotNull() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where title is not null
        defaultTrainingShouldBeFound("title.specified=true");

        // Get all the trainingList where title is null
        defaultTrainingShouldNotBeFound("title.specified=false");
    }

    @Test
    @Transactional
    public void getAllTrainingsByDescriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where description equals to DEFAULT_DESCRIPTION
        defaultTrainingShouldBeFound("description.equals=" + DEFAULT_DESCRIPTION);

        // Get all the trainingList where description equals to UPDATED_DESCRIPTION
        defaultTrainingShouldNotBeFound("description.equals=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllTrainingsByDescriptionIsInShouldWork() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where description in DEFAULT_DESCRIPTION or UPDATED_DESCRIPTION
        defaultTrainingShouldBeFound("description.in=" + DEFAULT_DESCRIPTION + "," + UPDATED_DESCRIPTION);

        // Get all the trainingList where description equals to UPDATED_DESCRIPTION
        defaultTrainingShouldNotBeFound("description.in=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllTrainingsByDescriptionIsNullOrNotNull() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where description is not null
        defaultTrainingShouldBeFound("description.specified=true");

        // Get all the trainingList where description is null
        defaultTrainingShouldNotBeFound("description.specified=false");
    }

    @Test
    @Transactional
    public void getAllTrainingsByContactPersonIsEqualToSomething() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where contactPerson equals to DEFAULT_CONTACT_PERSON
        defaultTrainingShouldBeFound("contactPerson.equals=" + DEFAULT_CONTACT_PERSON);

        // Get all the trainingList where contactPerson equals to UPDATED_CONTACT_PERSON
        defaultTrainingShouldNotBeFound("contactPerson.equals=" + UPDATED_CONTACT_PERSON);
    }

    @Test
    @Transactional
    public void getAllTrainingsByContactPersonIsInShouldWork() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where contactPerson in DEFAULT_CONTACT_PERSON or UPDATED_CONTACT_PERSON
        defaultTrainingShouldBeFound("contactPerson.in=" + DEFAULT_CONTACT_PERSON + "," + UPDATED_CONTACT_PERSON);

        // Get all the trainingList where contactPerson equals to UPDATED_CONTACT_PERSON
        defaultTrainingShouldNotBeFound("contactPerson.in=" + UPDATED_CONTACT_PERSON);
    }

    @Test
    @Transactional
    public void getAllTrainingsByContactPersonIsNullOrNotNull() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where contactPerson is not null
        defaultTrainingShouldBeFound("contactPerson.specified=true");

        // Get all the trainingList where contactPerson is null
        defaultTrainingShouldNotBeFound("contactPerson.specified=false");
    }

    @Test
    @Transactional
    public void getAllTrainingsByLinkIsEqualToSomething() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where link equals to DEFAULT_LINK
        defaultTrainingShouldBeFound("link.equals=" + DEFAULT_LINK);

        // Get all the trainingList where link equals to UPDATED_LINK
        defaultTrainingShouldNotBeFound("link.equals=" + UPDATED_LINK);
    }

    @Test
    @Transactional
    public void getAllTrainingsByLinkIsInShouldWork() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where link in DEFAULT_LINK or UPDATED_LINK
        defaultTrainingShouldBeFound("link.in=" + DEFAULT_LINK + "," + UPDATED_LINK);

        // Get all the trainingList where link equals to UPDATED_LINK
        defaultTrainingShouldNotBeFound("link.in=" + UPDATED_LINK);
    }

    @Test
    @Transactional
    public void getAllTrainingsByLinkIsNullOrNotNull() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where link is not null
        defaultTrainingShouldBeFound("link.specified=true");

        // Get all the trainingList where link is null
        defaultTrainingShouldNotBeFound("link.specified=false");
    }

    @Test
    @Transactional
    public void getAllTrainingsByValidUntilIsEqualToSomething() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where validUntil equals to DEFAULT_VALID_UNTIL
        defaultTrainingShouldBeFound("validUntil.equals=" + DEFAULT_VALID_UNTIL);

        // Get all the trainingList where validUntil equals to UPDATED_VALID_UNTIL
        defaultTrainingShouldNotBeFound("validUntil.equals=" + UPDATED_VALID_UNTIL);
    }

    @Test
    @Transactional
    public void getAllTrainingsByValidUntilIsInShouldWork() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where validUntil in DEFAULT_VALID_UNTIL or UPDATED_VALID_UNTIL
        defaultTrainingShouldBeFound("validUntil.in=" + DEFAULT_VALID_UNTIL + "," + UPDATED_VALID_UNTIL);

        // Get all the trainingList where validUntil equals to UPDATED_VALID_UNTIL
        defaultTrainingShouldNotBeFound("validUntil.in=" + UPDATED_VALID_UNTIL);
    }

    @Test
    @Transactional
    public void getAllTrainingsByValidUntilIsNullOrNotNull() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where validUntil is not null
        defaultTrainingShouldBeFound("validUntil.specified=true");

        // Get all the trainingList where validUntil is null
        defaultTrainingShouldNotBeFound("validUntil.specified=false");
    }

    @Test
    @Transactional
    public void getAllTrainingsByIsOfficialIsEqualToSomething() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where isOfficial equals to DEFAULT_IS_OFFICIAL
        defaultTrainingShouldBeFound("isOfficial.equals=" + DEFAULT_IS_OFFICIAL);

        // Get all the trainingList where isOfficial equals to UPDATED_IS_OFFICIAL
        defaultTrainingShouldNotBeFound("isOfficial.equals=" + UPDATED_IS_OFFICIAL);
    }

    @Test
    @Transactional
    public void getAllTrainingsByIsOfficialIsInShouldWork() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where isOfficial in DEFAULT_IS_OFFICIAL or UPDATED_IS_OFFICIAL
        defaultTrainingShouldBeFound("isOfficial.in=" + DEFAULT_IS_OFFICIAL + "," + UPDATED_IS_OFFICIAL);

        // Get all the trainingList where isOfficial equals to UPDATED_IS_OFFICIAL
        defaultTrainingShouldNotBeFound("isOfficial.in=" + UPDATED_IS_OFFICIAL);
    }

    @Test
    @Transactional
    public void getAllTrainingsByIsOfficialIsNullOrNotNull() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where isOfficial is not null
        defaultTrainingShouldBeFound("isOfficial.specified=true");

        // Get all the trainingList where isOfficial is null
        defaultTrainingShouldNotBeFound("isOfficial.specified=false");
    }

    @Test
    @Transactional
    public void getAllTrainingsBySuggestedByIsEqualToSomething() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where suggestedBy equals to DEFAULT_SUGGESTED_BY
        defaultTrainingShouldBeFound("suggestedBy.equals=" + DEFAULT_SUGGESTED_BY);

        // Get all the trainingList where suggestedBy equals to UPDATED_SUGGESTED_BY
        defaultTrainingShouldNotBeFound("suggestedBy.equals=" + UPDATED_SUGGESTED_BY);
    }

    @Test
    @Transactional
    public void getAllTrainingsBySuggestedByIsInShouldWork() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where suggestedBy in DEFAULT_SUGGESTED_BY or UPDATED_SUGGESTED_BY
        defaultTrainingShouldBeFound("suggestedBy.in=" + DEFAULT_SUGGESTED_BY + "," + UPDATED_SUGGESTED_BY);

        // Get all the trainingList where suggestedBy equals to UPDATED_SUGGESTED_BY
        defaultTrainingShouldNotBeFound("suggestedBy.in=" + UPDATED_SUGGESTED_BY);
    }

    @Test
    @Transactional
    public void getAllTrainingsBySuggestedByIsNullOrNotNull() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        // Get all the trainingList where suggestedBy is not null
        defaultTrainingShouldBeFound("suggestedBy.specified=true");

        // Get all the trainingList where suggestedBy is null
        defaultTrainingShouldNotBeFound("suggestedBy.specified=false");
    }

    @Test
    @Transactional
    public void getAllTrainingsBySkillIsEqualToSomething() throws Exception {
        // Initialize the database
        Skill skill = SkillResourceIntTest.createEntity(em);
        em.persist(skill);
        em.flush();
        training.addSkill(skill);
        trainingRepository.saveAndFlush(training);
        Long skillId = skill.getId();

        // Get all the trainingList where skill equals to skillId
        defaultTrainingShouldBeFound("skillId.equals=" + skillId);

        // Get all the trainingList where skill equals to skillId + 1
        defaultTrainingShouldNotBeFound("skillId.equals=" + (skillId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultTrainingShouldBeFound(String filter) throws Exception {
        restTrainingMockMvc.perform(get("/api/trainings?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(training.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].contactPerson").value(hasItem(DEFAULT_CONTACT_PERSON.toString())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())))
            .andExpect(jsonPath("$.[*].validUntil").value(hasItem(DEFAULT_VALID_UNTIL.toString())))
            .andExpect(jsonPath("$.[*].isOfficial").value(hasItem(DEFAULT_IS_OFFICIAL.booleanValue())))
            .andExpect(jsonPath("$.[*].suggestedBy").value(hasItem(DEFAULT_SUGGESTED_BY.toString())));

        // Check, that the count call also returns 1
        restTrainingMockMvc.perform(get("/api/trainings/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultTrainingShouldNotBeFound(String filter) throws Exception {
        restTrainingMockMvc.perform(get("/api/trainings?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTrainingMockMvc.perform(get("/api/trainings/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingTraining() throws Exception {
        // Get the training
        restTrainingMockMvc.perform(get("/api/trainings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTraining() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        int databaseSizeBeforeUpdate = trainingRepository.findAll().size();

        // Update the training
        Training updatedTraining = trainingRepository.findById(training.getId()).get();
        // Disconnect from session so that the updates on updatedTraining are not directly saved in db
        em.detach(updatedTraining);
        updatedTraining
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .contactPerson(UPDATED_CONTACT_PERSON)
            .link(UPDATED_LINK)
            .validUntil(UPDATED_VALID_UNTIL)
            .isOfficial(UPDATED_IS_OFFICIAL)
            .suggestedBy(UPDATED_SUGGESTED_BY);
        TrainingDTO trainingDTO = trainingMapper.toDto(updatedTraining);

        restTrainingMockMvc.perform(put("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingDTO)))
            .andExpect(status().isOk());

        // Validate the Training in the database
        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeUpdate);
        Training testTraining = trainingList.get(trainingList.size() - 1);
        assertThat(testTraining.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTraining.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTraining.getContactPerson()).isEqualTo(UPDATED_CONTACT_PERSON);
        assertThat(testTraining.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testTraining.getValidUntil()).isEqualTo(UPDATED_VALID_UNTIL);
        assertThat(testTraining.isIsOfficial()).isEqualTo(UPDATED_IS_OFFICIAL);
        assertThat(testTraining.getSuggestedBy()).isEqualTo(UPDATED_SUGGESTED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingTraining() throws Exception {
        int databaseSizeBeforeUpdate = trainingRepository.findAll().size();

        // Create the Training
        TrainingDTO trainingDTO = trainingMapper.toDto(training);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainingMockMvc.perform(put("/api/trainings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Training in the database
        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTraining() throws Exception {
        // Initialize the database
        trainingRepository.saveAndFlush(training);

        int databaseSizeBeforeDelete = trainingRepository.findAll().size();

        // Delete the training
        restTrainingMockMvc.perform(delete("/api/trainings/{id}", training.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Training> trainingList = trainingRepository.findAll();
        assertThat(trainingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Training.class);
        Training training1 = new Training();
        training1.setId(1L);
        Training training2 = new Training();
        training2.setId(training1.getId());
        assertThat(training1).isEqualTo(training2);
        training2.setId(2L);
        assertThat(training1).isNotEqualTo(training2);
        training1.setId(null);
        assertThat(training1).isNotEqualTo(training2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainingDTO.class);
        TrainingDTO trainingDTO1 = new TrainingDTO();
        trainingDTO1.setId(1L);
        TrainingDTO trainingDTO2 = new TrainingDTO();
        assertThat(trainingDTO1).isNotEqualTo(trainingDTO2);
        trainingDTO2.setId(trainingDTO1.getId());
        assertThat(trainingDTO1).isEqualTo(trainingDTO2);
        trainingDTO2.setId(2L);
        assertThat(trainingDTO1).isNotEqualTo(trainingDTO2);
        trainingDTO1.setId(null);
        assertThat(trainingDTO1).isNotEqualTo(trainingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(trainingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(trainingMapper.fromId(null)).isNull();
    }
}
