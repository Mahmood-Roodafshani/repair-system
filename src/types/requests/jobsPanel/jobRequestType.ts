import {JobLevel, JobStatus} from 'src/constant/enums';

export type JobRequestType = {
    title?: string;
    id?: string | number;
    code?: string;
    jobDescription?: string;
    responsibilityDescription?: string;
    organizationUnit?: string | number;
    neededFields?: string[] | number[];
    neededCourses?: string[] | number[];
    positionDegree?: string | number;
    jobLevel?: JobLevel;
    jobStatus?: JobStatus;
};
