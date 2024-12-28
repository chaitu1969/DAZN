import movie from "../../../models/movie";

describe("Movie model", () => {
  // Checking for valid movie object
  it("should check a correct movie object", async () => {
    const validMovie = new movie({
      title: "RRR",
      genre: "Drama",
      rating: 4.8,
      streamingLink: "https://www.nextflix.com/rrr",
    });

    await expect(validMovie.validate()).resolves.not.toThrow();
  });

  //   check for missing required field

  it("should throw valid error for missing required field", async () => {
    const invalid = new movie({});
    await expect(invalid.validate()).rejects.toThrow();
  });

  // //   Check for invalid type

  // it("should throw validation error for invalid type", () => {
  //   const invalidMovie = new movie({
  //     title: "RRR",
  //     genre: "Invalid",
  //     rating: "A string",
  //     streamingLink: "https://www.nextflix.com/rrr",
  //   });

  //   try {
  //     invalidMovie.validateSync();
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   expect(() => invalidMovie.validateSync()).toThrow();
  // });
});
