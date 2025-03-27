import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';
import { FC, useCallback, useState } from 'react';
import classes from './AttractionCreateModal.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { AttractionEditFormSchema } from '../../../../../entities/Attraction/model/types/attractionEditFormSchema';
import { ImageUpload } from '../../../../../entities/Attraction/ui/ImageUpload/ImageUpload';
import { Status } from '@/shared/libs/types/status';
import { useCreateAttractionMutation } from '../../../../../entities/Attraction/api/attractionApi';
import { makeMapLink } from '@/shared/libs/helpers/makeMapLink';
import { goalOfImageUpload } from '@/shared/libs/const/goalOfImageUpload';

interface AttractionCreateModalProps {
  open: boolean;
  close: () => void;
}

export const AttractionCreateModal: FC<AttractionCreateModalProps> = ({
  open,
  close,
}) => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [createAttraction] = useCreateAttractionMutation();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AttractionEditFormSchema>({
    defaultValues: {
      title: '',
      location: '',
      rating: 0,
      coordinates: { latitude: 0, longitude: 0 },
      status: Status.planned,
      photo: '',
      dateAdded: new Date().toISOString().split('T')[0],
      timeAdded: new Date().toLocaleTimeString(),
      mapLink: '',
    },
  });

  const onSubmitHandler = useCallback(
    async (data: AttractionEditFormSchema) => {
      try {
        const resultData = {
          id: crypto.randomUUID(),
          ...data,
          mapLink: makeMapLink(data.coordinates),
        };
        await createAttraction(resultData);
        close();
        setUploadImage(null);
        reset();
      } catch (error: unknown) {
        if (error instanceof Error)
          setError('root', { type: 'server', message: error?.message });
      }
    },
    [close, createAttraction, reset, setError]
  );

  return (
    <Modal open={open} onOpenChange={close}>
      <div className={classes.modalForm}>
        <h2>Создание</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)} className={classes.form}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Название:"
                size="l"
                className={classes.textInput}
                error={errors.title?.message}
              />
            )}
          />

          <ImageUpload
            goalImageUpload={goalOfImageUpload.create}
            control={control}
            uploadImage={uploadImage}
            setUploadImage={setUploadImage}
          />

          <Controller
            name="location"
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Локация"
                size="l"
                className={classes.textInput}
                error={errors.location?.message}
              />
            )}
          />
          <Controller
            name="coordinates.latitude"
            control={control}
            rules={{
              required: 'Обязательное поле',
              min: { value: -90, message: 'От -90 до 90' },
              max: { value: 90, message: 'От -90 до 90' },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value.toString()}
                onUpdate={(value) => field.onChange(Number(value))}
                type="number"
                label="Широта"
                size="l"
                className={classes.textInput}
                error={errors.coordinates?.latitude?.message}
              />
            )}
          />
          <Controller
            name="coordinates.longitude"
            control={control}
            rules={{
              required: 'Обязательное поле',
              min: { value: -180, message: 'От -180 до 180' },
              max: { value: 180, message: 'От -180 до 180' },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value.toString()}
                onUpdate={(value) => field.onChange(Number(value))}
                type="number"
                label="Долгота"
                size="l"
                className={classes.textInput}
                error={errors.coordinates?.longitude?.message}
              />
            )}
          />
          <Controller
            name="rating"
            control={control}
            rules={{
              required: 'Обязательное поле',
              min: { value: 0, message: 'От 0 до 5' },
              max: { value: 5, message: 'От 0 до 5' },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value.toString()}
                onUpdate={(value) => {
                  field.onChange(value);
                }}
                type="number"
                label="Рейтинг"
                size="l"
                error={errors.rating?.message}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                label="Статус"
                value={[field.value]}
                onUpdate={(value) => field.onChange(value[0])}
                options={Object.values(Status).map((status) => ({
                  value: status,
                  content: status,
                }))}
                size="l"
              />
            )}
          />
          {Boolean(errors.root?.message) && (
            <span className={classes.serverError}>{errors.root!.message}</span>
          )}
          <Button type="submit" view="action" size="l">
            Сохранить
          </Button>
        </form>
      </div>
    </Modal>
  );
};
