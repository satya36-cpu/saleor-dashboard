import { Backlink } from "@dashboard/components/Backlink";
import CardSpacer from "@dashboard/components/CardSpacer";
import Container from "@dashboard/components/Container";
import Form from "@dashboard/components/Form";
import Grid from "@dashboard/components/Grid";
import Metadata, { MetadataFormData } from "@dashboard/components/Metadata";
import PageHeader from "@dashboard/components/PageHeader";
import Savebar from "@dashboard/components/Savebar";
import {
  ProductTypeKindEnum,
  TaxClassBaseFragment,
  WeightUnitsEnum,
} from "@dashboard/graphql";
import { SubmitPromise } from "@dashboard/hooks/useForm";
import useNavigator from "@dashboard/hooks/useNavigator";
import useStateFromProps from "@dashboard/hooks/useStateFromProps";
import { sectionNames } from "@dashboard/intl";
import {
  handleTaxClassChange,
  makeProductTypeKindChangeHandler,
} from "@dashboard/productTypes/handlers";
import { productTypeListUrl } from "@dashboard/productTypes/urls";
import { FetchMoreProps, UserError } from "@dashboard/types";
import useMetadataChangeTrigger from "@dashboard/utils/metadata/useMetadataChangeTrigger";
import { ConfirmButtonTransitionState } from "@saleor/macaw-ui";
import React from "react";
import { useIntl } from "react-intl";

import ProductTypeDetails from "../ProductTypeDetails/ProductTypeDetails";
import ProductTypeShipping from "../ProductTypeShipping/ProductTypeShipping";
import ProductTypeTaxes from "../ProductTypeTaxes/ProductTypeTaxes";

export interface ProductTypeForm extends MetadataFormData {
  name: string;
  kind: ProductTypeKindEnum;
  isShippingRequired: boolean;
  taxClassId: string;
  weight: number;
}

export interface ProductTypeCreatePageProps {
  errors: UserError[];
  defaultWeightUnit: WeightUnitsEnum;
  disabled: boolean;
  pageTitle: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  taxClasses: TaxClassBaseFragment[];
  kind: ProductTypeKindEnum;
  onChangeKind: (kind: ProductTypeKindEnum) => void;
  onSubmit: (data: ProductTypeForm) => SubmitPromise<any[]>;
  onFetchMoreTaxClasses: FetchMoreProps;
}

const formInitialData: ProductTypeForm = {
  isShippingRequired: false,
  metadata: [],
  name: "",
  kind: ProductTypeKindEnum.NORMAL,
  privateMetadata: [],
  taxClassId: "",
  weight: 0,
};

const ProductTypeCreatePage: React.FC<ProductTypeCreatePageProps> = ({
  defaultWeightUnit,
  disabled,
  errors,
  pageTitle,
  saveButtonBarState,
  taxClasses,
  kind,
  onChangeKind,
  onSubmit,
  onFetchMoreTaxClasses,
}: ProductTypeCreatePageProps) => {
  const intl = useIntl();
  const navigate = useNavigator();

  const [taxClassDisplayName, setTaxClassDisplayName] = useStateFromProps("");
  const {
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  const initialData = {
    ...formInitialData,
    kind: kind || formInitialData.kind,
  };

  return (
    <Form
      confirmLeave
      initial={initialData}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {({ change, data, isSaveDisabled, submit }) => {
        const changeMetadata = makeMetadataChangeHandler(change);

        const changeKind = makeProductTypeKindChangeHandler(
          change,
          onChangeKind,
        );

        return (
          <Container>
            <Backlink href={productTypeListUrl()}>
              {intl.formatMessage(sectionNames.productTypes)}
            </Backlink>
            <PageHeader title={pageTitle} />
            <Grid>
              <div>
                <ProductTypeDetails
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                  onKindChange={changeKind}
                />
                <CardSpacer />
                <ProductTypeTaxes
                  disabled={disabled}
                  data={data}
                  taxClasses={taxClasses}
                  taxClassDisplayName={taxClassDisplayName}
                  onChange={event =>
                    handleTaxClassChange(
                      event,
                      taxClasses,
                      change,
                      setTaxClassDisplayName,
                    )
                  }
                  onFetchMore={onFetchMoreTaxClasses}
                />
                <CardSpacer />
                <Metadata data={data} onChange={changeMetadata} />
              </div>
              <div>
                <ProductTypeShipping
                  disabled={disabled}
                  data={data}
                  weightUnit={defaultWeightUnit}
                  onChange={change}
                />
              </div>
            </Grid>
            <Savebar
              onCancel={() => navigate(productTypeListUrl())}
              onSubmit={submit}
              disabled={isSaveDisabled}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};
ProductTypeCreatePage.displayName = "ProductTypeCreatePage";
export default ProductTypeCreatePage;
