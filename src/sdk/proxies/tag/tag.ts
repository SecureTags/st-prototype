export interface Tag
{
    id: string;
    productName: string;
    companyName: string;
    imageUrl: ReadonlyArray<string>;
    ownerId: string;
    isLost: boolean;
    
    transferTagOwnership(targetOwnerId: string): Promise<void>;
    flagTagAsLost(): Promise<void>;
}