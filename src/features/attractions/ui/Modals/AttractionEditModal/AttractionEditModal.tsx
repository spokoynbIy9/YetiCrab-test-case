import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';
import { FC, useCallback, useEffect, useState } from 'react';
import { AttractionDto } from '../../../../../entities/Attraction/model/types/attractionDto';
import { Controller, useForm } from 'react-hook-form';
import { Status } from '@/shared/libs/types/status';
import classes from './AttractionEditModal.module.scss';
import { useUpdateAttractionMutation } from '../../../../../entities/Attraction/api/attractionApi';
import { AttractionEditFormSchema } from '../../../../../entities/Attraction/model/types/attractionEditFormSchema';
import { makeMapLink } from '@/shared/libs/helpers/makeMapLink';
import { ImageUpload } from '../../../../../entities/Attraction/ui/ImageUpload/ImageUpload';

interface AttractionEditModalProps {
  open: boolean;
  close: () => void;
  initialValues: AttractionDto | null;
}

export const AttractionEditModal: FC<AttractionEditModalProps> = ({
  open,
  close,
  initialValues,
}) => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [updateAttraction] = useUpdateAttractionMutation();
  const {
    control,
    reset,
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
    async (newData: AttractionEditFormSchema) => {
      try {
        const resultData = {
          id: initialValues!.id,
          ...newData,
          mapLink: makeMapLink(newData.coordinates),
        };
        await updateAttraction(resultData);
        setUploadImage(null);
        close();
      } catch (error: unknown) {
        if (error instanceof Error)
          setError('root', { type: 'server', message: error?.message });
      }
    },
    [close, initialValues, setError, updateAttraction]
  );

  useEffect(() => {
    if (initialValues) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = initialValues;
      reset(rest);
    }
  }, [initialValues, reset]);

  return (
    <Modal open={open} onOpenChange={close}>
      <div className={classes.modalForm}>
        <h2>Редактирование</h2>
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
          <Button
            type="submit"
            view="action"
            size="l"
            disabled={Boolean(!initialValues)}
          >
            Сохранить
          </Button>
        </form>
      </div>
    </Modal>
  );
};
