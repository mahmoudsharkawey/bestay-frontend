import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { Loader2, Pencil } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { getInitials } from '@/shared/utils/user'
import { useAvatarUpload } from '@/features/profile/hooks/useProfile'

export default function AvatarSection({ currentPicture, userName }) {
  const { t } = useTranslation()
  const { onDrop, preview, isPending: isUploading } = useAvatarUpload()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    disabled: isUploading,
  })

  return (
    <div className="relative">
      <Avatar className="h-24 w-24 border-4 border-white" style={{ boxShadow: '0 2px 12px rgba(27, 61, 111, 0.08)' }}>
        <AvatarImage src={preview || currentPicture} alt={userName} />
        <AvatarFallback className="text-xl bg-orange-light text-orange font-semibold">
          {getInitials(userName)}
        </AvatarFallback>
      </Avatar>
      <div
        {...getRootProps()}
        className={`absolute bottom-0 right-0 w-8 h-8 rounded-full bg-orange flex items-center justify-center cursor-pointer hover:bg-orange-hover transition-colors ${isUploading ? 'opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        {isUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin text-white" /> : <Pencil className="h-3.5 w-3.5 text-white" />}
      </div>
    </div>
  )
}
