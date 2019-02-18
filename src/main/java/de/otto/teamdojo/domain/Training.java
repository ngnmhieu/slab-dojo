package de.otto.teamdojo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Training.
 */
@Entity
@Table(name = "training")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Training implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 80)
    @Column(name = "title", length = 80, nullable = false)
    private String title;

    @Size(max = 100)
    @Column(name = "description", length = 100)
    private String description;

    @Size(max = 255)
    @Column(name = "contact_person", length = 255)
    private String contactPerson;

    @Size(max = 255)
    @Pattern(regexp = "^(?:http(s)?://)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#\\[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$")
    @Column(name = "jhi_link", length = 255)
    private String link;

    @Column(name = "valid_until")
    private Instant validUntil;

    @NotNull
    @Column(name = "is_official", nullable = false)
    private Boolean isOfficial;

    @Column(name = "suggested_by")
    private String suggestedBy;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "training_skill",
               joinColumns = @JoinColumn(name = "trainings_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "skills_id", referencedColumnName = "id"))
    private Set<Skill> skills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Training title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Training description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public Training contactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
        return this;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getLink() {
        return link;
    }

    public Training link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Instant getValidUntil() {
        return validUntil;
    }

    public Training validUntil(Instant validUntil) {
        this.validUntil = validUntil;
        return this;
    }

    public void setValidUntil(Instant validUntil) {
        this.validUntil = validUntil;
    }

    public Boolean isIsOfficial() {
        return isOfficial;
    }

    public Training isOfficial(Boolean isOfficial) {
        this.isOfficial = isOfficial;
        return this;
    }

    public void setIsOfficial(Boolean isOfficial) {
        this.isOfficial = isOfficial;
    }

    public String getSuggestedBy() {
        return suggestedBy;
    }

    public Training suggestedBy(String suggestedBy) {
        this.suggestedBy = suggestedBy;
        return this;
    }

    public void setSuggestedBy(String suggestedBy) {
        this.suggestedBy = suggestedBy;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public Training skills(Set<Skill> skills) {
        this.skills = skills;
        return this;
    }

    public Training addSkill(Skill skill) {
        this.skills.add(skill);
        skill.getTrainings().add(this);
        return this;
    }

    public Training removeSkill(Skill skill) {
        this.skills.remove(skill);
        skill.getTrainings().remove(this);
        return this;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Training training = (Training) o;
        if (training.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), training.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Training{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", contactPerson='" + getContactPerson() + "'" +
            ", link='" + getLink() + "'" +
            ", validUntil='" + getValidUntil() + "'" +
            ", isOfficial='" + isIsOfficial() + "'" +
            ", suggestedBy='" + getSuggestedBy() + "'" +
            "}";
    }
}
