import { FormSection } from "./FormSection";
import { Textarea } from "@/components/ui/textarea";

interface ImageInputProps {
  mainImage: string;
  additionalImages: string[];
  onMainImageChange: (value: string) => void;
  onAdditionalImagesChange: (value: string[]) => void;
}

export const ImageInput = ({
  mainImage,
  additionalImages,
  onMainImageChange,
  onAdditionalImagesChange,
}: ImageInputProps) => {
  const handleImagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const imageUrls = e.target.value.split('\n').filter(url => url.trim());
    onAdditionalImagesChange(imageUrls);
  };

  return (
    <div className="space-y-4">
      <FormSection title="Main Image URL">
        <input
          type="text"
          value={mainImage}
          onChange={(e) => onMainImageChange(e.target.value)}
          className="w-full rounded-md bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
          placeholder="Enter main image URL"
        />
      </FormSection>
      <FormSection title="Additional Images (one URL per line)">
        <Textarea
          value={additionalImages.join('\n')}
          onChange={handleImagesChange}
          className="min-h-[100px] bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
          placeholder="Enter image URLs, one per line"
        />
        <div className="mt-2 grid grid-cols-2 gap-2">
          {additionalImages.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="h-full w-full rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      </FormSection>
    </div>
  );
};