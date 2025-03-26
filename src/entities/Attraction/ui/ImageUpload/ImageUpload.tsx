import { Control, Controller } from 'react-hook-form';
import { AttractionEditFormSchema } from '../../model/types/attractionEditFormSchema';
import { FC, useRef, useState } from 'react';
import { fileToBase64 } from '@/shared/libs/helpers/filtToBase64';
import { Button, Icon, Modal } from '@gravity-ui/uikit';
import { CircleXmark, Picture } from '@gravity-ui/icons';
import { goalOfImageUpload } from '@/shared/libs/const/goalOfImageUpload';

// todo
// убрать inline-style

interface ImageUploadProps {
  control: Control<AttractionEditFormSchema, unknown>;
  uploadImage: string | null;
  setUploadImage: (value: string | null) => void;

  goalImageUpload?: goalOfImageUpload;
}

export const ImageUpload: FC<ImageUploadProps> = ({
  control,
  uploadImage,
  setUploadImage,
  goalImageUpload,
}) => {
  const [increaseImage, setIncreaseImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const closeIncreaseImage = () => setIncreaseImage(false);
  const handleButtonImgClick = () => fileInputRef.current?.click();

  return (
    <Controller
      name="photo"
      control={control}
      rules={
        goalImageUpload === goalOfImageUpload.create
          ? {
              required: 'Обязательное прикрепите фото',
            }
          : {}
      }
      render={({ field, fieldState: { error } }) => (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const base64 = await fileToBase64(file);
                setUploadImage(base64);
                field.onChange(base64);
              }
            }}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <Button
            style={{ fontWeight: 600, width: '100%' }}
            onClick={handleButtonImgClick}
            view="outlined"
            size="l"
          >
            Прикрепите фото
            <Icon data={Picture} size={16} />
          </Button>
          {error && (
            <div
              style={{
                color: 'var(--g-color-text-danger)',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                marginTop: 2,
              }}
            >
              <span>{error.message}</span>
            </div>
          )}
          {uploadImage && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                gap: 4,
              }}
            >
              <img
                src={uploadImage}
                alt="Выбранное фото"
                style={{
                  width: 50,
                  height: 50,
                  objectFit: 'cover',
                  borderRadius: 5,
                  cursor: 'pointer',
                }}
                onClick={() => setIncreaseImage(true)}
              />
              <Button
                onClick={() => {
                  field.onChange(null);
                  setUploadImage(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                view="flat"
                size="m"
              >
                <Icon data={CircleXmark} size={16} />
              </Button>
              <Modal open={increaseImage} onOpenChange={closeIncreaseImage}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                  }}
                >
                  <img
                    src={uploadImage}
                    alt="Увеличенное фото"
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '90vh',
                      borderRadius: 10,
                    }}
                  />
                </div>
              </Modal>
            </div>
          )}
        </div>
      )}
    />
  );
};
