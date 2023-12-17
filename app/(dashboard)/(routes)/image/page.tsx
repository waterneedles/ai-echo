"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const ImagePage = () => {
    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/conversation");

            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    }

  return (
    <div>
      <Heading 
        title="Image Generation"
        description="The conversation tool allows you to generate images based on a prompt."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                    <FormField name="prompt"
                    render={({ field }) => (
                        <FormItem className="col-span-12 lg:col-span-10">
                            <FormControl className="m-0 p-0">
                                <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                disabled={isLoading}
                                placeholder="Tell me a fun fact about dolphins!"
                                {...field}/>
                            </FormControl>
                        </FormItem>
                    )}/>
                    <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                        Generate
                    </Button>
                </form>
            </Form>
        </div>
        <div className="space-y-4 mt-4">
            {isLoading && (
                <div className="p-20">
                    <Loader />
                </div>
            )}
            {images.length === 0 && !isLoading && (
                <Empty label="Imagination is your only limit!"/>
            )}
            <div>
                Images will be rendered here
            </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePage;