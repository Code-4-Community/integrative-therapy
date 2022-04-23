import { createNewUser } from "app/auth/mutations/signup"
import { Chance } from "chance"
import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  await db.$reset()

  await createNewUser("admin@email.com", "password")

  const random = new Chance(12345)
  for (let i = 0; i < 10; i++) {
    const locationToCreate = {
      city: random.city(),
      zipCode: random.zip(),
      address: random.address(),
    }

    await db.therapist.create({
      data: {
        name: random.name(),
        location: { create: locationToCreate },
        description: random.paragraph(),
      },
    })
  }
}

export default seed
