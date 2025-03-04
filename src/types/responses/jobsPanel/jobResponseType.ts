export type JobResponseType = {
  title: string;
  id: string | number;
  code?: string;
  jobDescription?: string;
  responsibilityDescription?: string;
  organizationUnit?: string | number;
  neededFields?: string[] | number[];
  neededCourses?: string[] | number[];
  positionDegree?: string | number;
  jobLevel?: string;
  jobStatus?: string;
};
