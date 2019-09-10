import { TEST_VALID_PASSWORD } from '../../express/utils/tests/testData';

export const adminOptions = {
  defaultEmail: 'admin@example.com',
  defaultPassword: TEST_VALID_PASSWORD,
  userType: 'Admin',
};

export const firstInstructorOptions = {
  defaultEmail: 'first.instructor@example.com',
  defaultPassword: TEST_VALID_PASSWORD,
  userType: 'Instructor',
};

export const secondInstructorOptions = {
  defaultEmail: 'second.instructor@example.com',
  defaultPassword: TEST_VALID_PASSWORD,
  userType: 'Instructor',
};

export const firstStudentOptions = {
  defaultEmail: 'first.student@example.com',
  defaultPassword: TEST_VALID_PASSWORD,
  userType: 'Student',
};

export const secondStudentOptions = {
  defaultEmail: 'second.student@example.com',
  defaultPassword: TEST_VALID_PASSWORD,
  userType: 'Student',
};
