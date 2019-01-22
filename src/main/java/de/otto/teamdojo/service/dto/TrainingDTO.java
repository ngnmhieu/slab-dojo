package de.otto.teamdojo.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Training entity.
 */
public class TrainingDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 80)
    private String title;

    @Size(max = 100)
    private String description;

    @Size(max = 255)
    private String contactPerson;

    @Size(max = 255)
    @Pattern(regexp = "^(?:http(s)?://)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#\\[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$")
    private String link;

    private Instant validUntil;

    @NotNull
    private Boolean isOfficial;

    private Set<SkillDTO> skills = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Instant getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(Instant validUntil) {
        this.validUntil = validUntil;
    }

    public Boolean isIsOfficial() {
        return isOfficial;
    }

    public void setIsOfficial(Boolean isOfficial) {
        this.isOfficial = isOfficial;
    }

    public Set<SkillDTO> getSkills() {
        return skills;
    }

    public void setSkills(Set<SkillDTO> skills) {
        this.skills = skills;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TrainingDTO trainingDTO = (TrainingDTO) o;
        if (trainingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), trainingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TrainingDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", contactPerson='" + getContactPerson() + "'" +
            ", link='" + getLink() + "'" +
            ", validUntil='" + getValidUntil() + "'" +
            ", isOfficial='" + isIsOfficial() + "'" +
            "}";
    }
}
