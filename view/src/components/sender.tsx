import React from "react";
import { style } from "typestyle";
import { useFormik } from "formik";

export default function Sender({
  sendFunc,
  setUsername,
}: {
  sendFunc: (arg0: string) => void;
  setUsername: (arg0: string) => void;
}): JSX.Element {
  const formik = useFormik({
    initialValues: { message: "" },
    onSubmit: (values) => {
      sendFunc(values.message);
      formik.setFieldValue("message", "");
    },
  });
  const nameSet = useFormik({
    initialValues: { name: "" },
    onSubmit: (values) => {
      setUsername(values.name);
      formik.setFieldValue("name", "anon");
    },
  });
  let css = style({
    backgroundColor: "#767D8B",
    borderRadius: "1em",
    padding: "1em",
    color: "#35383E",
    position: "sticky",
    bottom: 0,
  });
  //put forms here dumbass
  return (
    <div className={css}>
      <form
        onSubmit={formik.handleSubmit}
        className={style({ display: "flex" })}
      >
        <label htmlFor="message"></label>
        <input
          id="message"
          name="message"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.message}
          className={style({ flex: "1 0" })}
        />
        <button type="submit">↲</button>
      </form>

      <form onSubmit={nameSet.handleSubmit}>
        <label htmlFor="name"></label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={nameSet.handleChange}
          value={nameSet.values.name}
        />
        <button type="submit">↲</button>
      </form>
    </div>
  );
}
