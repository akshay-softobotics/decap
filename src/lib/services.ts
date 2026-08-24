import services from "../../meta/services.yml";

export type ServiceContent = {
  readonly slug: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly detail: string;
};

export function listServices(): ServiceContent[] {
  return services.services;
}

export function getService(slug: string): ServiceContent | undefined {
  return services.services.find((it: ServiceContent) => it.slug === slug);
}
