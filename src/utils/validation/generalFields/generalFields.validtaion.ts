import { useTranslation } from "react-i18next";
import { z } from "zod";
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    // .regex(passwordRules, { message: t("validation.passwordRules") }) ,
export const useGeneralFields = () => {
  const { t } = useTranslation();
  return {
    // phone: z
    //   .number({ required_error: t("validation.required") })
    //   .refine((n) => /^05\d{8}$/.test(n.toString()), {
    //     message: t("validation.phone"),
    //   }),
    // .min(10, t("validation.phone")),
    phone: z.string({
      required_error: t("validation.required"),
      // invalid_type_error: t("validation.phone"),
    }),
    // .regex(/^5\d{8}$/, {
    //   message: t("validation.phone"),
    // }),
    password: z.string({
        required_error: t("validation.required"),
      })
    .min(7, { message: t("validation.password")}),
    email: z
      .string({
        required_error: t("validation.required"),
      })
      .email(t("validation.email")),
    rePassword: z.string({
      required_error: t("validation.required"),
    }),
    name: z.string({
      required_error: t("validation.required"),
    }),
    numberRequired: z.number({
      required_error: t("validation.required"),
    }),
    numberRequiredNoZero: z
      .number({
        required_error: t("validation.required"),
      })
      .refine((n) => n !== 0, {
        message: t("validation.min"),
      }),
    // >>>>>>>>>> optional
    emailNotRequired: z.string().email(t("validation.email")).optional(),
    phoneOptional: z
      .string({
        required_error: t("validation.required"),
        // invalid_type_error: t("validation.phone"),
      })
      .regex(/^5\d{8}$/, {
        message: t("validation.phone"),
      })
      .optional(),
  };
};
// .superRefine(({ rePassword, password }, ctx) => {
//     if (rePassword !== password) {
//       ctx.addIssue({
//         code: "custom",
//         message: t("validation.passwordMatch"),
//         path: ["rePassword"],
//       });
//     }
//   }),
