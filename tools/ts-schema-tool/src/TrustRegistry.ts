
export interface PermissionlessTrustRegistry {
 type: "permissionless";
}

export interface IssuerTrustRegistry {
 type: "issuer";
 issuerDid: string;
}

export interface TokenCuratedTrustRegistry {
 type: "tokenCurated";
 token: string;
 minAmount: number;
}

export type TrustRegistry = PermissionlessTrustRegistry | IssuerTrustRegistry | TokenCuratedTrustRegistry;
