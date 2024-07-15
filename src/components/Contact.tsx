import React from "react";
import apiClient from "../api/apiClient";
import { useForm } from "react-hook-form";
import { contactFormContent, contactFormSchema } from "../formValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const Contact: React.FC = () => {
	const form = useForm<contactFormContent>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	const onSubmit = async (values: contactFormContent) => {
		try {
			const response = await apiClient.post("/contact/submit/", values);
			console.log(response.data.message);
			form.reset();
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Contact Me</h1>
			<Form {...form}>
				<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="px-1">
									Name
									<FormControl className="p-3">
										<Input placeholder="Your name" {...field} />
									</FormControl>
									<FormDescription className="px-1">
										Please enter your full name
									</FormDescription>
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="px-1">
									Email
									<FormControl>
										<Input placeholder="Your email" {...field} />
									</FormControl>
									<FormDescription className="px-1">
										Emails are not shared with anyone
									</FormDescription>
								</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="px-1">
									Message
									<FormControl>
										<Textarea placeholder="Your message" {...field} rows={5} />
									</FormControl>
									<FormDescription className="px-1">
										What would you like to tell me?
									</FormDescription>
								</FormLabel>
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default Contact;
