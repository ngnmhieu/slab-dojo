package de.otto.teamdojo.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import de.otto.teamdojo.domain.enumeration.UserMode;

/**
 * A Organization.
 */
@Entity
@Table(name = "organization")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Organization implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "level_up_score")
    private Integer levelUpScore;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "user_mode", nullable = false)
    private UserMode userMode;

    @Size(max = 255)
    @Pattern(regexp = "^(?:http(s)?://)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#\\[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$")
    @Column(name = "mattermost_url", length = 255)
    private String mattermostUrl;

    @Min(value = 0)
    @Column(name = "count_of_confirmations")
    private Integer countOfConfirmations;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Organization name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevelUpScore() {
        return levelUpScore;
    }

    public Organization levelUpScore(Integer levelUpScore) {
        this.levelUpScore = levelUpScore;
        return this;
    }

    public void setLevelUpScore(Integer levelUpScore) {
        this.levelUpScore = levelUpScore;
    }

    public UserMode getUserMode() {
        return userMode;
    }

    public Organization userMode(UserMode userMode) {
        this.userMode = userMode;
        return this;
    }

    public void setUserMode(UserMode userMode) {
        this.userMode = userMode;
    }

    public String getMattermostUrl() {
        return mattermostUrl;
    }

    public Organization mattermostUrl(String mattermostUrl) {
        this.mattermostUrl = mattermostUrl;
        return this;
    }

    public void setMattermostUrl(String mattermostUrl) {
        this.mattermostUrl = mattermostUrl;
    }

    public Integer getCountOfConfirmations() {
        return countOfConfirmations;
    }

    public Organization countOfConfirmations(Integer countOfConfirmations) {
        this.countOfConfirmations = countOfConfirmations;
        return this;
    }

    public void setCountOfConfirmations(Integer countOfConfirmations) {
        this.countOfConfirmations = countOfConfirmations;
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
        Organization organization = (Organization) o;
        if (organization.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organization.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Organization{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", levelUpScore=" + getLevelUpScore() +
            ", userMode='" + getUserMode() + "'" +
            ", mattermostUrl='" + getMattermostUrl() + "'" +
            ", countOfConfirmations=" + getCountOfConfirmations() +
            "}";
    }
}
