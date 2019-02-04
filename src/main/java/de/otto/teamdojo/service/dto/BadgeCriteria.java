package de.otto.teamdojo.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.InstantFilter;

/**
 * Criteria class for the Badge entity. This class is used in BadgeResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /badges?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class BadgeCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private StringFilter description;

    private InstantFilter availableUntil;

    private IntegerFilter availableAmount;

    private DoubleFilter requiredScore;

    private DoubleFilter instantMultiplier;

    private IntegerFilter completionBonus;

    private LongFilter skillsId;

    private LongFilter dimensionsId;

    private LongFilter imageId;

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public StringFilter getDescription() {
        return description;
    }

    public void setDescription(StringFilter description) {
        this.description = description;
    }

    public InstantFilter getAvailableUntil() {
        return availableUntil;
    }

    public void setAvailableUntil(InstantFilter availableUntil) {
        this.availableUntil = availableUntil;
    }

    public IntegerFilter getAvailableAmount() {
        return availableAmount;
    }

    public void setAvailableAmount(IntegerFilter availableAmount) {
        this.availableAmount = availableAmount;
    }

    public DoubleFilter getRequiredScore() {
        return requiredScore;
    }

    public void setRequiredScore(DoubleFilter requiredScore) {
        this.requiredScore = requiredScore;
    }

    public DoubleFilter getInstantMultiplier() {
        return instantMultiplier;
    }

    public void setInstantMultiplier(DoubleFilter instantMultiplier) {
        this.instantMultiplier = instantMultiplier;
    }

    public IntegerFilter getCompletionBonus() {
        return completionBonus;
    }

    public void setCompletionBonus(IntegerFilter completionBonus) {
        this.completionBonus = completionBonus;
    }

    public LongFilter getSkillsId() {
        return skillsId;
    }

    public void setSkillsId(LongFilter skillsId) {
        this.skillsId = skillsId;
    }

    public LongFilter getDimensionsId() {
        return dimensionsId;
    }

    public void setDimensionsId(LongFilter dimensionsId) {
        this.dimensionsId = dimensionsId;
    }

    public LongFilter getImageId() {
        return imageId;
    }

    public void setImageId(LongFilter imageId) {
        this.imageId = imageId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final BadgeCriteria that = (BadgeCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(description, that.description) &&
            Objects.equals(availableUntil, that.availableUntil) &&
            Objects.equals(availableAmount, that.availableAmount) &&
            Objects.equals(requiredScore, that.requiredScore) &&
            Objects.equals(instantMultiplier, that.instantMultiplier) &&
            Objects.equals(completionBonus, that.completionBonus) &&
            Objects.equals(skillsId, that.skillsId) &&
            Objects.equals(dimensionsId, that.dimensionsId) &&
            Objects.equals(imageId, that.imageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        name,
        description,
        availableUntil,
        availableAmount,
        requiredScore,
        instantMultiplier,
        completionBonus,
        skillsId,
        dimensionsId,
        imageId
        );
    }

    @Override
    public String toString() {
        return "BadgeCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (description != null ? "description=" + description + ", " : "") +
                (availableUntil != null ? "availableUntil=" + availableUntil + ", " : "") +
                (availableAmount != null ? "availableAmount=" + availableAmount + ", " : "") +
                (requiredScore != null ? "requiredScore=" + requiredScore + ", " : "") +
                (instantMultiplier != null ? "instantMultiplier=" + instantMultiplier + ", " : "") +
                (completionBonus != null ? "completionBonus=" + completionBonus + ", " : "") +
                (skillsId != null ? "skillsId=" + skillsId + ", " : "") +
                (dimensionsId != null ? "dimensionsId=" + dimensionsId + ", " : "") +
                (imageId != null ? "imageId=" + imageId + ", " : "") +
            "}";
    }

}
