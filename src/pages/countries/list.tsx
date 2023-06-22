import { IResourceComponentsProps, GetListResponse } from "@refinedev/core";
import { HeadlessInferencer } from "@refinedev/inferencer/headless";

export const CountriesList: React.FC<IResourceComponentsProps<GetListResponse<{}>>> = () => {
    return <HeadlessInferencer />;
};
