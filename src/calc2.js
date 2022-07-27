<Center>
            <h1>Estimated Monthly Payment:&nbsp;</h1>
                      {state.data.deposit == null && state.data.rate == null && !state.data.terms ? (
                        <h1>
                          $
                          {Math.round(
                            ((state.data.price - state.data.price * (filteredTerm.deposit / 100))  * (filteredTerm.rate / 100 / 12)  *

                              Math.pow( 1 + filteredTerm.rate / 100 / 12,  filteredTerm.term * 12 ) ) /

                              (Math.pow( 1 + filteredTerm.rate / 100 / 12, filteredTerm.term * 12 ) - 1)

                          ).toLocaleString("en")}
                        </h1>
                      ) : null}

                      {state.data.deposit == null && state.data.rate == null && state.data.terms ? (
                        <h1>
                          $ {Math.round( ((state.data.price - state.data.price * (filteredTerm.deposit / 100)) *
                              (filteredTerm.rate / 100 / 12) * Math.pow( 1 + filteredTerm.rate / 100 / 12,
                                state.data.terms
                              )) /
                              
                              (Math.pow( 1 + filteredTerm.rate / 100 / 12, state.data.terms ) - 1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}

                      {state.data.deposit && state.data.rate == null && !state.data.terms ? (
                        <h1>
                          $ {Math.round( ((state.data.price - state.data.price * (state.data.deposit / 100)) * (filteredTerm.rate / 100 / 12) *
                              
                              Math.pow( 1 + filteredTerm.rate / 100 / 12, filteredTerm.term )) /

                              (Math.pow( 1 + filteredTerm.rate / 100 / 12, filteredTerm.term ) - 1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}

                      {state.data.rate && !state.data.deposit && !state.data.terms ? (
                        <h1>
                          $ {Math.round(
                            ((state.data.price -  state.data.price * (filteredTerm.deposit / 100)) * (state.data.rate / 100 / 12) *
                              
                            Math.pow( 1 + state.data.rate / 100 / 12, filteredTerm.term )) /

                              (Math.pow( 1 + state.data.rate / 100 / 12, filteredTerm.term) -1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}

                      {state.data.terms && state.data.rate == null && !state.data.deposit == null ? (
                        <h1>
                          ${Math.round(  ((state.data.price - state.data.price * (filteredTerm.deposit / 100)) *
                              (filteredTerm.rate / 100 / 12) *

                              Math.pow( 1 + filteredTerm.rate / 100 / 12, state.data.terms )) /

                              (Math.pow(1 + filteredTerm.rate / 100 / 12,state.data.terms) -1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}

                      {state.data.deposit && state.data.rate && state.data.terms == null ? (
                        <h1>
                          $ {Math.round(
                            ((state.data.price - state.data.price * (state.data.deposit / 100)) *
                              (state.data.rate / 100 / 12) * Math.pow(
                                1 + state.data.rate / 100 / 12, filteredTerm.term )) /
                              (Math.pow( 1 + state.data.rate / 100 / 12, filteredTerm.term ) - 1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}
                      {state.data.deposit &&
                      state.data.rate == null &&
                      state.data.terms ? (
                        <h1>
                          $ {Math.round( ((state.data.price - state.data.price * (state.data.deposit / 100)) *
                              (filteredTerm.rate / 100 / 12) *
                              Math.pow( 1 + filteredTerm.rate / 100 / 12, state.data.terms )) /

                              (Math.pow( 1 + filteredTerm.rate / 100 / 12, state.data.terms) -  1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}

                      {!state.data.deposit && state.data.rate && state.data.terms ? (
                        <h1>
                          $ {Math.round( ((state.data.price - state.data.price * (filteredTerm.deposit / 100)) *
                              (state.data.rate / 100 / 12) * Math.pow( 1 + state.data.rate / 100 / 12,
                                state.data.terms
                              )) /
                              (Math.pow( 1 + state.data.rate / 100 / 12, state.data.terms) - 1)
                             
                             ).toLocaleString("en")}
                        </h1>
                      ) : null}
                      {state.data.deposit && state.data.rate &&
                      state.data.terms ? (
                        <h1>${Math.round( ((state.data.price - state.data.price * (state.data.deposit / 100)) * (state.data.rate / 100 / 12) *
                              Math.pow( 1 + state.data.rate / 100 / 12, state.data.terms )) /
                              (Math.pow( 1 + state.data.rate / 100 / 12, state.data.terms ) - 1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}
                      
                      {state.data.deposit === 0 && state.data.rate == null && !state.data.terms ? (
                        <h1>
                          ${Math.round( (state.data.price *
                              (filteredTerm.rate / 100 / 12) *
                              Math.pow( 1 + filteredTerm.rate / 100 / 12,
                                filteredTerm.term
                              )) /
                              (Math.pow( 1 + filteredTerm.rate / 100 / 12, filteredTerm.term ) - 1)
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}

                      {state.data.deposit === 0 && state.data.rate === 0 && !state.data.terms ? (
                        <h1>
                          $ {Math.round( state.data.price / filteredTerm.term
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}
                      {state.data.deposit === 0 && state.data.rate === 0 &&
                      state.data.terms ? (
                        <h1>
                          $
                          {Math.round( state.data.price / state.data.terms ).toLocaleString("en")}
                        </h1>
                      ) : null}
                      {state.data.deposit == null && state.data.rate === 0 &&
                      state.data.terms == null ? (
                        <h1>
                          $ {Math.round( state.data.price / filteredTerm.term
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}
                      {state.data.deposit == null &&
                      state.data.rate === 0 &&
                      state.data.terms ? (
                        <h1>
                          ${Math.round(state.data.price / state.data.terms
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}
                      {state.data.deposit && state.data.rate === 0 &&
                      state.data.terms ? (
                        <h1>
                          ${Math.round( (state.data.price - state.data.price * (state.data.deposit / 100)) / state.data.terms
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}
                      {state.data.deposit && state.data.rate === 0 &&
                      !state.data.terms ? (
                        <h1>
                          ${Math.round( (state.data.price - state.data.price * (state.data.deposit / 100)) / filteredTerm.term
                          ).toLocaleString("en")}
                        </h1>
                      ) : null}
                       

                    </Center>