import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, AfterSoftRemove } from "typeorm";
import { dispatchEventsCallback } from "../eventUtils";

enum Event {
    USER_ID = "user_id",
};

@Entity({
    name: "t_user",
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    @Column({
      primary: true,
      type: "uuid",
      nullable: false,
      unique: true
    })
  declare id: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  declare firstname: string;

  @Column({
    nullable: false,
    type: "varchar",
    unique: true
  })
  declare lastName: string;

  @Column({
    nullable: false,
    type: "varchar",
    unique: true
  })
  declare username: string;

  @Column({
    nullable: false,
    type: "boolean",
  })
  declare isActivated: string;

  @Column({
    nullable: false,
    type: "text",
    unique: true
  })
  declare password: string;

    @Column({
      nullable: false,
      type: "varchar",
      unique: true
    })
    declare email: string;


    @Column({ name: "created_at" })
    declare createdAt?: string;

    @Column({ 
      type: "uuid",
      unique: true,
    })
    declare mediaId?: string;

    @AfterInsert()
    dispatchInsertEvent() {
        dispatchEventsCallback(this, Event.USER_ID)
    }

    @AfterUpdate()
    dispatchUpdateEvent() {
        dispatchEventsCallback(this, Event.USER_ID)
    }

    @AfterSoftRemove()
    dispatchSoftRemoveEvent() {
        dispatchEventsCallback(this, Event.USER_ID)
    }

    @AfterRemove()
    dispatchRemoveEvent() {
        dispatchEventsCallback(this, Event.USER_ID)
    }
}