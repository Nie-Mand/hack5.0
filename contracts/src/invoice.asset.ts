import { Object, Property } from "fabric-contract-api";

@Object()
export class Invoice {
  @Property()
  public docType?: string;

  @Property()
  public ID: string;

  @Property()
  public ProductName: string;

  @Property()
  public UnitPrice: number;

  @Property()
  public Description: string;

  @Property()
  public Customer: string;

  @Property()
  public Url: string;

  @Property()
  public When: string;

  @Property()
  public Status: string;

  @Property()
  public Owner: string;
}
