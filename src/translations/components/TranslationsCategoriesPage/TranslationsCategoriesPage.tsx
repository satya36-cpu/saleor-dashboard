import { Backlink } from "@dashboard/components/Backlink";
import CardSpacer from "@dashboard/components/CardSpacer";
import Container from "@dashboard/components/Container";
import LanguageSwitch from "@dashboard/components/LanguageSwitch";
import PageHeader from "@dashboard/components/PageHeader";
import {
  CategoryTranslationFragment,
  LanguageCodeEnum,
} from "@dashboard/graphql";
import { commonMessages, sectionNames } from "@dashboard/intl";
import { getStringOrPlaceholder } from "@dashboard/misc";
import {
  TranslationInputFieldName,
  TranslationsEntitiesPageProps,
} from "@dashboard/translations/types";
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from "@dashboard/translations/urls";
import React from "react";
import { useIntl } from "react-intl";

import TranslationFields from "../TranslationFields";

export interface TranslationsCategoriesPageProps
  extends TranslationsEntitiesPageProps {
  data: CategoryTranslationFragment;
}

const TranslationsCategoriesPage: React.FC<TranslationsCategoriesPageProps> = ({
  translationId,
  activeField,
  disabled,
  languageCode,
  languages,
  data,
  saveButtonState,
  onDiscard,
  onEdit,
  onSubmit,
}) => {
  const intl = useIntl();

  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.categories,
        })}
      >
        {intl.formatMessage(sectionNames.translations)}
      </Backlink>
      <PageHeader
        title={intl.formatMessage(
          {
            id: "XitW/z",
            defaultMessage:
              'Translation Category "{categoryName}" - {languageCode}',
          },
          {
            categoryName: getStringOrPlaceholder(data?.category?.name),
            languageCode,
          },
        )}
      >
        <LanguageSwitch
          currentLanguage={LanguageCodeEnum[languageCode]}
          languages={languages}
          getLanguageUrl={lang =>
            languageEntityUrl(
              lang,
              TranslatableEntities.categories,
              translationId,
            )
          }
        />
      </PageHeader>
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={intl.formatMessage(commonMessages.generalInformations)}
        fields={[
          {
            displayName: intl.formatMessage({
              id: "vEYtiq",
              defaultMessage: "Category Name",
            }),
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: "short" as "short",
            value: data?.category?.name,
          },
          {
            displayName: intl.formatMessage(commonMessages.description),
            name: TranslationInputFieldName.description,
            translation: data?.translation?.description || null,
            type: "rich" as "rich",
            value: data?.category?.description,
          },
        ]}
        saveButtonState={saveButtonState}
        richTextResetKey={languageCode}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
      <CardSpacer />
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={intl.formatMessage({
          id: "TGX4T1",
          defaultMessage: "Search Engine Preview",
        })}
        fields={[
          {
            displayName: intl.formatMessage({
              id: "HlEpii",
              defaultMessage: "Search Engine Title",
            }),
            name: TranslationInputFieldName.seoTitle,
            translation: data?.translation?.seoTitle || null,
            type: "short" as "short",
            value: data?.category?.seoTitle,
          },
          {
            displayName: intl.formatMessage({
              id: "US3IPU",
              defaultMessage: "Search Engine Description",
            }),
            name: TranslationInputFieldName.seoDescription,
            translation: data?.translation?.seoDescription || null,
            type: "long" as "long",
            value: data?.category?.seoDescription,
          },
        ]}
        saveButtonState={saveButtonState}
        richTextResetKey={languageCode}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
    </Container>
  );
};
TranslationsCategoriesPage.displayName = "TranslationsCategoriesPage";
export default TranslationsCategoriesPage;
