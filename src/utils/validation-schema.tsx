import * as Yup from 'yup';


// contact_schema
export const contact_schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  category: Yup.string().required().label("Subject"),
  email: Yup.string().required().email().label("Email"),
  message: Yup.string().required().min(20).label("Message"),
});

export const signup_schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  userName: Yup.string().required().label("Username"),
  email: Yup.string().required().label("Email"),
  phone: Yup.string().required().min(11).label("Phone"),
  password: Yup.string().required().min(6).label("Password"),
});

export const login_schema = Yup.object().shape({
userName: Yup.string().required().label("User Name"),
  password: Yup.string().required().min(6).label("Password"),
});
//forgot schema
export const forgotten_schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email")
});
//blog comment schema
export const blogCommentSchema = Yup.object().shape({
  name: Yup.string().required().label("FirstName"),
  comment: Yup.string().required().min(20).label("Comment")
});
