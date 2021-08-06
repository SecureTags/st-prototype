import { Tag } from "../../proxies/tag/tag";

export interface TagService
{
    createTag(productName: string, companyName: string, imageUrl: ReadonlyArray<string>, ownerName: string):
        Promise<Tag>;
    fetchTag(id: string): Promise<Tag>;
}