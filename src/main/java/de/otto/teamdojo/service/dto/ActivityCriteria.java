package de.otto.teamdojo.service.dto;

import java.io.Serializable;
import java.util.Objects;
import de.otto.teamdojo.domain.enumeration.ActivityType;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.InstantFilter;

/**
 * Criteria class for the Activity entity. This class is used in ActivityResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /activities?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ActivityCriteria implements Serializable {
    /**
     * Class for filtering ActivityType
     */
    public static class ActivityTypeFilter extends Filter<ActivityType> {
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private ActivityTypeFilter type;

    private StringFilter data;

    private InstantFilter createdAt;

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public ActivityTypeFilter getType() {
        return type;
    }

    public void setType(ActivityTypeFilter type) {
        this.type = type;
    }

    public StringFilter getData() {
        return data;
    }

    public void setData(StringFilter data) {
        this.data = data;
    }

    public InstantFilter getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(InstantFilter createdAt) {
        this.createdAt = createdAt;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ActivityCriteria that = (ActivityCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(type, that.type) &&
            Objects.equals(data, that.data) &&
            Objects.equals(createdAt, that.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        type,
        data,
        createdAt
        );
    }

    @Override
    public String toString() {
        return "ActivityCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (type != null ? "type=" + type + ", " : "") +
                (data != null ? "data=" + data + ", " : "") +
                (createdAt != null ? "createdAt=" + createdAt + ", " : "") +
            "}";
    }

}
