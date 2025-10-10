import { validateSession } from "@lib/auth/session";
import { prisma } from "@lib/prisma";
import { deleteProfilePicture, uploadProfilePicture } from "@lib/minio";
import type { APIContext } from "astro";

export async function POST({ request, cookies, redirect }: APIContext) {
  try {
    const user = await validateSession(cookies.get("wp-auth-session")?.value);

    const formData = await request.formData();
    const profilePicture = formData.get("profilePicture") as File | null;
    const bio = formData.get("bio") as string | null;

    const updateData: any = {};

    if (profilePicture && !profilePicture.type.startsWith("image/")) {
      throw new Error("The profile picture must be an image");
    }

    if (profilePicture) {
      // get and delete the old profile picture
      const oldProfilePicture = await prisma.user.findUnique({
        where: { id: user.id },
        select: { pfp: true },
      });

      if (oldProfilePicture!.pfp !== "default.png") {
        await deleteProfilePicture(oldProfilePicture!.pfp);
      }

      const profilePictureUrl = await uploadProfilePicture(profilePicture);
      updateData.pfp = profilePictureUrl;
    }

    if (bio) {
      updateData.bio = bio;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });
    
    return redirect("/dashboard/profile");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    console.error("Error updating profile:", error);

    cookies.set("error", errorMessage, { path: "/dashboard" });
    return redirect("/dashboard/profile");
  }
}