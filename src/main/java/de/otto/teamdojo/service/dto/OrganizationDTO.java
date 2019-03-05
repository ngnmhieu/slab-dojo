package de.otto.teamdojo.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import de.otto.teamdojo.domain.enumeration.UserMode;

/**
 * A DTO for the Organization entity.
 */
public class OrganizationDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private Integer levelUpScore;

    @NotNull
    private UserMode userMode;

    @Size(max = 255)
    @Pattern(regexp = "^(?:http(s)?://)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#\\[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$")
    private String mattermostUrl;

    @Min(value = 0)
    private Integer countOfConfirmations;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevelUpScore() {
        return levelUpScore;
    }

    public void setLevelUpScore(Integer levelUpScore) {
        this.levelUpScore = levelUpScore;
    }

    public UserMode getUserMode() {
        return userMode;
    }

    public void setUserMode(UserMode userMode) {
        this.userMode = userMode;
    }

    public String getMattermostUrl() {
        return mattermostUrl;
    }

    public void setMattermostUrl(String mattermostUrl) {
        this.mattermostUrl = mattermostUrl;
    }

    public Integer getCountOfConfirmations() {
        return countOfConfirmations;
    }

    public void setCountOfConfirmations(Integer countOfConfirmations) {
        this.countOfConfirmations = countOfConfirmations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrganizationDTO organizationDTO = (OrganizationDTO) o;
        if (organizationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organizationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrganizationDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", levelUpScore=" + getLevelUpScore() +
            ", userMode='" + getUserMode() + "'" +
            ", mattermostUrl='" + getMattermostUrl() + "'" +
            ", countOfConfirmations=" + getCountOfConfirmations() +
            "}";
    }
}
