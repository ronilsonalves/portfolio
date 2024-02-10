"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Socials from "./social";
import sendContactMsg from "@/lib/actions/sendMailMsg";

export function ContactForm() {
  const t = useTranslations("Contact");

  const formSchema = z.object({
    fullName: z.string().min(5, {
      message: t("Form.Validation.Name.MinLength"),
    }),
    subject: z.string().optional(),
    email: z.string().email({
      message: t("Form.Validation.Email.Invalid"),
    }),
    message: z.string().min(60, {
      message: t("Form.Validation.Message.MinLength"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      subject: "",
      email: "",
      message: "",
    },
  });
  const [message, setMessage] = useState<[string, string]>();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("subject", values.subject || "");

    const response = sendContactMsg(form.getValues(), formData);
    response.then((res) => {
      switch (res.status) {
        case 200:
          form.reset();
          return setMessage(["success", t("Messages.Success.Description")]);
        default:
          return setMessage(["error", t("Messages.Error.Description")]);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <h4 className="text-3xl font-bold">{t("Title")}</h4>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Form.Name.Title")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Form.Name.Placeholder")} {...field} />
              </FormControl>
              <FormDescription>{t("Form.Name.Subtitle")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Form.Subject.Title")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Form.Subject.Placeholder")} {...field} />
              </FormControl>
              <FormDescription>{t("Form.Subject.Subtitle")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Form.Email.Title")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Form.Email.Placeholder")} {...field} />
              </FormControl>
              <FormDescription>{t("Form.Email.Subtitle")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="dark:text-white">
              <FormLabel className="dark:text-white">
                {t("Form.Message.Title")}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("Form.Message.Placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("Form.Message.Subtitle")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {message && (
          <Alert variant={message[0] === "success" ? "default" : "destructive"}>
            <AlertTitle>
              {message[0] === "success"
                ? t("Messages.Success.Title")
                : t("Messages.Error.Title")}
            </AlertTitle>
            <AlertDescription>{message[1]}</AlertDescription>
          </Alert>
        )}
        <Button type="submit">{t("Form.Button")}</Button>
      </form>
    </Form>
  );
}
