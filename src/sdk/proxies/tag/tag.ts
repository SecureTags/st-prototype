export interface Tag
{
    id: string;
    productName: string;
    companyName: string;
    imageUrl: ReadonlyArray<string>;
    ownerId: string;
    
    transferTagOwnership(targetOwnerId: string): Promise<void>;
}