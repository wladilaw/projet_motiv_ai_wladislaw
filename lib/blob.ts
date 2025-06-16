import { put, del, list } from "@vercel/blob"

export const blobService = {
  // Upload file to Vercel Blob
  async uploadFile(file: File, pathname: string) {
    try {
      const blob = await put(pathname, file, {
        access: "public",
      })
      return blob
    } catch (error) {
      console.error("Error uploading file:", error)
      throw new Error("Failed to upload file")
    }
  },

  // Upload from buffer
  async uploadBuffer(buffer: Buffer, pathname: string, contentType: string) {
    try {
      const blob = await put(pathname, buffer, {
        access: "public",
        contentType,
      })
      return blob
    } catch (error) {
      console.error("Error uploading buffer:", error)
      throw new Error("Failed to upload buffer")
    }
  },

  // Delete file
  async deleteFile(url: string) {
    try {
      await del(url)
      return true
    } catch (error) {
      console.error("Error deleting file:", error)
      throw new Error("Failed to delete file")
    }
  },

  // List files
  async listFiles(prefix?: string) {
    try {
      const { blobs } = await list({
        prefix,
      })
      return blobs
    } catch (error) {
      console.error("Error listing files:", error)
      throw new Error("Failed to list files")
    }
  },
}
