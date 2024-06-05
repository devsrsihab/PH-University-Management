import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchAbleFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

// create
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

// get all
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourse.course'), query)
    .search(courseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

// get single
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisiteCourse.course');
  return result;
};

// update
const updateCourseToDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload;

  // basic data update
  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData, {
    new: true,
    runValidators: true,
  });

  // checck if preRequisiteCourse exist
  if (preRequisiteCourse && preRequisiteCourse.length > 0) {
    // filter deleted field
    const deletedPreRequisites = preRequisiteCourse
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourse: { course: { $in: deletedPreRequisites } } },
    });

    // filter for new data insert
    const newPreRequisites = preRequisiteCourse.filter((el) => el.course && !el.isDeleted);

    const newPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourse: { $each: newPreRequisites } },
    });
  }

  const result = await Course.findById(id).populate('preRequisiteCourse.course');

  return result;
};

// deleted
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
  return result;
};

// export all
export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseToDB,
  deleteCourseFromDB,
};
