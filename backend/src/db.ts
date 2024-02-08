import { DataSource, Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
export class Enterprise extends BaseEntity {
  @Column()
  title: string;

  @PrimaryColumn()
  username: string;

  @Column()
  image: string;

  @Column()
  password: string;
}

export async function getDb() {
  try {
    const db = new DataSource({
      type: "sqlite",
      database: "./tmp.db",
      entities: [Enterprise],
      synchronize: true,
      logging: false,
    })

    await db.initialize()

    // const enterprise = new Enterprise()
    // enterprise.title = "Enterprise"
    // enterprise.username = "entreprise1"
    // enterprise.image = "https://i.imgur.com/4YkK9YH.png"
    // enterprise.password = await bcrypt.hash("admin", 10)
    
    // await enterprise.save()
    
    // const enterprise2 = new Enterprise()
    // enterprise2.title = "Enterprise 2"
    // enterprise2.username = "entreprise2"
    // enterprise2.image = "https://i.imgur.com/4YkK9YH.png"
    // enterprise2.password = await bcrypt.hash("admin", 10)

    // await enterprise2.save()

  } catch (e: any) {
    console.log(e);
  }
}
