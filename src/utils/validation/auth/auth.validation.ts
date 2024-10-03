import { t } from "i18next";
import { z } from "zod";
import { useGeneralFields } from "../generalFields";
 const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    
export const useAuthValidation = () => {
  // TODO::optimize
  const { phone ,password,email} = useGeneralFields();

  const loginSchema = z.object({
    phone: phone,
    password:password,
  });
  const registerSchema = z.object({
    phone: z.string({
      required_error: t("validation.required"),
      invalid_type_error: t("validation.phone"),
    }).regex(/^5\d{8}$/, t("validation.phone")),

    password: z.string({
        required_error: t("validation.required"),
      })
    .min(7, { message: t("validation.passwordRules")}).regex(passwordRules, { message: t("validation.passwordRules") }) ,
    email: email,
    // package_id: z.coerce.number(),
    // device_country_id: z.coerce.number(),
  });
  const forgetPasswordSchema = z
    .object({
      password: z
        .string({
          required_error: t("validation.required"),
        })
        .min(8, t("validation.password")),
      rePassword: z.string({
        required_error: t("validation.required"),
      }),
    })
    .superRefine(({ rePassword, password }, ctx) => {
      if (rePassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: t("validation.passwordMatch"),
          path: ["rePassword"],
        });
      }
    });

  return { loginSchema, registerSchema, forgetPasswordSchema };
};
