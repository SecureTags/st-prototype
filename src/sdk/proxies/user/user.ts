export interface User
{
    id: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
    tags: ReadonlyArray<string>;
    
    transferTagOwnership(tagId: string, targetUserId: string): Promise<void>;
}