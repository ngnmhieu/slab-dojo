package de.otto.teamdojo.web.rest;

import de.otto.teamdojo.TeamdojoApp;

import de.otto.teamdojo.domain.PersonSkill;
import de.otto.teamdojo.domain.Skill;
import de.otto.teamdojo.domain.Person;
import de.otto.teamdojo.repository.PersonSkillRepository;
import de.otto.teamdojo.service.PersonSkillService;
import de.otto.teamdojo.service.dto.PersonSkillDTO;
import de.otto.teamdojo.service.mapper.PersonSkillMapper;
import de.otto.teamdojo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.ArrayList;

import static de.otto.teamdojo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PersonSkillResource REST controller.
 *
 * @see PersonSkillResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TeamdojoApp.class)
public class PersonSkillResourceIntTest {

    private static final Instant DEFAULT_COMPLETED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_COMPLETED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_VERIFIED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VERIFIED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_IRRELEVANT = false;
    private static final Boolean UPDATED_IRRELEVANT = true;

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    @Autowired
    private PersonSkillRepository personSkillRepository;



    @Autowired
    private PersonSkillMapper personSkillMapper;
    

    @Autowired
    private PersonSkillService personSkillService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPersonSkillMockMvc;

    private PersonSkill personSkill;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonSkillResource personSkillResource = new PersonSkillResource(personSkillService);
        this.restPersonSkillMockMvc = MockMvcBuilders.standaloneSetup(personSkillResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonSkill createEntity(EntityManager em) {
        PersonSkill personSkill = new PersonSkill()
            .completedAt(DEFAULT_COMPLETED_AT)
            .verifiedAt(DEFAULT_VERIFIED_AT)
            .irrelevant(DEFAULT_IRRELEVANT)
            .note(DEFAULT_NOTE);
        // Add required entity
        Skill skill = SkillResourceIntTest.createEntity(em);
        em.persist(skill);
        em.flush();
        personSkill.setSkill(skill);
        // Add required entity
        Person person = PersonResourceIntTest.createEntity(em);
        em.persist(person);
        em.flush();
        personSkill.setPerson(person);
        return personSkill;
    }

    @Before
    public void initTest() {
        personSkill = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersonSkill() throws Exception {
        int databaseSizeBeforeCreate = personSkillRepository.findAll().size();

        // Create the PersonSkill
        PersonSkillDTO personSkillDTO = personSkillMapper.toDto(personSkill);
        restPersonSkillMockMvc.perform(post("/api/person-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personSkillDTO)))
            .andExpect(status().isCreated());

        // Validate the PersonSkill in the database
        List<PersonSkill> personSkillList = personSkillRepository.findAll();
        assertThat(personSkillList).hasSize(databaseSizeBeforeCreate + 1);
        PersonSkill testPersonSkill = personSkillList.get(personSkillList.size() - 1);
        assertThat(testPersonSkill.getCompletedAt()).isEqualTo(DEFAULT_COMPLETED_AT);
        assertThat(testPersonSkill.getVerifiedAt()).isEqualTo(DEFAULT_VERIFIED_AT);
        assertThat(testPersonSkill.isIrrelevant()).isEqualTo(DEFAULT_IRRELEVANT);
        assertThat(testPersonSkill.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    public void createPersonSkillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personSkillRepository.findAll().size();

        // Create the PersonSkill with an existing ID
        personSkill.setId(1L);
        PersonSkillDTO personSkillDTO = personSkillMapper.toDto(personSkill);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonSkillMockMvc.perform(post("/api/person-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personSkillDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PersonSkill in the database
        List<PersonSkill> personSkillList = personSkillRepository.findAll();
        assertThat(personSkillList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPersonSkills() throws Exception {
        // Initialize the database
        personSkillRepository.saveAndFlush(personSkill);

        // Get all the personSkillList
        restPersonSkillMockMvc.perform(get("/api/person-skills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personSkill.getId().intValue())))
            .andExpect(jsonPath("$.[*].completedAt").value(hasItem(DEFAULT_COMPLETED_AT.toString())))
            .andExpect(jsonPath("$.[*].verifiedAt").value(hasItem(DEFAULT_VERIFIED_AT.toString())))
            .andExpect(jsonPath("$.[*].irrelevant").value(hasItem(DEFAULT_IRRELEVANT.booleanValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.toString())));
    }
    

    @Test
    @Transactional
    public void getPersonSkill() throws Exception {
        // Initialize the database
        personSkillRepository.saveAndFlush(personSkill);

        // Get the personSkill
        restPersonSkillMockMvc.perform(get("/api/person-skills/{id}", personSkill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(personSkill.getId().intValue()))
            .andExpect(jsonPath("$.completedAt").value(DEFAULT_COMPLETED_AT.toString()))
            .andExpect(jsonPath("$.verifiedAt").value(DEFAULT_VERIFIED_AT.toString()))
            .andExpect(jsonPath("$.irrelevant").value(DEFAULT_IRRELEVANT.booleanValue()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPersonSkill() throws Exception {
        // Get the personSkill
        restPersonSkillMockMvc.perform(get("/api/person-skills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersonSkill() throws Exception {
        // Initialize the database
        personSkillRepository.saveAndFlush(personSkill);

        int databaseSizeBeforeUpdate = personSkillRepository.findAll().size();

        // Update the personSkill
        PersonSkill updatedPersonSkill = personSkillRepository.findById(personSkill.getId()).get();
        // Disconnect from session so that the updates on updatedPersonSkill are not directly saved in db
        em.detach(updatedPersonSkill);
        updatedPersonSkill
            .completedAt(UPDATED_COMPLETED_AT)
            .verifiedAt(UPDATED_VERIFIED_AT)
            .irrelevant(UPDATED_IRRELEVANT)
            .note(UPDATED_NOTE);
        PersonSkillDTO personSkillDTO = personSkillMapper.toDto(updatedPersonSkill);

        restPersonSkillMockMvc.perform(put("/api/person-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personSkillDTO)))
            .andExpect(status().isOk());

        // Validate the PersonSkill in the database
        List<PersonSkill> personSkillList = personSkillRepository.findAll();
        assertThat(personSkillList).hasSize(databaseSizeBeforeUpdate);
        PersonSkill testPersonSkill = personSkillList.get(personSkillList.size() - 1);
        assertThat(testPersonSkill.getCompletedAt()).isEqualTo(UPDATED_COMPLETED_AT);
        assertThat(testPersonSkill.getVerifiedAt()).isEqualTo(UPDATED_VERIFIED_AT);
        assertThat(testPersonSkill.isIrrelevant()).isEqualTo(UPDATED_IRRELEVANT);
        assertThat(testPersonSkill.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    public void updateNonExistingPersonSkill() throws Exception {
        int databaseSizeBeforeUpdate = personSkillRepository.findAll().size();

        // Create the PersonSkill
        PersonSkillDTO personSkillDTO = personSkillMapper.toDto(personSkill);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPersonSkillMockMvc.perform(put("/api/person-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personSkillDTO)))
            .andExpect(status().isCreated());

        // Validate the PersonSkill in the database
        List<PersonSkill> personSkillList = personSkillRepository.findAll();
        assertThat(personSkillList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePersonSkill() throws Exception {
        // Initialize the database
        personSkillRepository.saveAndFlush(personSkill);

        int databaseSizeBeforeDelete = personSkillRepository.findAll().size();

        // Get the personSkill
        restPersonSkillMockMvc.perform(delete("/api/person-skills/{id}", personSkill.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PersonSkill> personSkillList = personSkillRepository.findAll();
        assertThat(personSkillList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonSkill.class);
        PersonSkill personSkill1 = new PersonSkill();
        personSkill1.setId(1L);
        PersonSkill personSkill2 = new PersonSkill();
        personSkill2.setId(personSkill1.getId());
        assertThat(personSkill1).isEqualTo(personSkill2);
        personSkill2.setId(2L);
        assertThat(personSkill1).isNotEqualTo(personSkill2);
        personSkill1.setId(null);
        assertThat(personSkill1).isNotEqualTo(personSkill2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonSkillDTO.class);
        PersonSkillDTO personSkillDTO1 = new PersonSkillDTO();
        personSkillDTO1.setId(1L);
        PersonSkillDTO personSkillDTO2 = new PersonSkillDTO();
        assertThat(personSkillDTO1).isNotEqualTo(personSkillDTO2);
        personSkillDTO2.setId(personSkillDTO1.getId());
        assertThat(personSkillDTO1).isEqualTo(personSkillDTO2);
        personSkillDTO2.setId(2L);
        assertThat(personSkillDTO1).isNotEqualTo(personSkillDTO2);
        personSkillDTO1.setId(null);
        assertThat(personSkillDTO1).isNotEqualTo(personSkillDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(personSkillMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(personSkillMapper.fromId(null)).isNull();
    }
}
