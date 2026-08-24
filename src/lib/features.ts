import features from "../../meta/features.yml";

export type FeatureContent = {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
};

export function listFeatures(): FeatureContent[] {
  return features.features;
}
