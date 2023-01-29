export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly categories: string[];
  readonly tags: string[];
  readonly price: string;
  readonly image: string[];
}
