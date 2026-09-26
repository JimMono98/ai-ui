type PackagerAsset = Record<string, unknown>;

const assets = new Map<number, PackagerAsset>();
let nextAssetId = 1;

export const registerAsset = (asset: PackagerAsset): number => {
  const id = nextAssetId++;
  assets.set(id, asset);
  return id;
};

export const getAssetByID = (
  assetId: number,
): PackagerAsset | null => {
  return assets.get(assetId) ?? null;
};

export const AssetRegistry = {
  registerAsset,
  getAssetByID,
};

export default AssetRegistry;
