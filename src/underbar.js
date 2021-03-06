(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var arrLen = array.length;
    if (n > arrLen) {
      return array;
    }
    return n === undefined ? array[arrLen - 1] : array.slice(arrLen - n, arrLen);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    else {
      for (var prop in collection)
        iterator(collection[prop], prop, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var returnedArr = [];

    _.each(collection, function(value) {
      if (test(value)) {
        returnedArr.push(value);
      }
    });

    return returnedArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var obversTest = function(value) {
      return !test(value);
    }

    return _.filter(collection, obversTest);
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var resultsElems = [];
    var uniqElems = {};

    _.each(array, function(elem) {
      uniqElems[elem] = elem;
    });

    for (var key in uniqElems) {
      resultsElems.push(uniqElems[key]);
    }
    
    return resultsElems;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var returnedArr = [];

    _.each(collection, function(item) {
      returnedArr.push(iterator(item));
    })

    return returnedArr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var noAccum = arguments[2] === undefined;

    _.each(collection, function(item) {
      if (noAccum) {
        accumulator = item;
        noAccum = false;
      } else {
        accumulator = iterator(accumulator, item);
      }
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (!arguments[1]) {
      iterator = _.identity;
    }

    return _.reduce(collection, function(passedIterator, item) {
      if (!passedIterator) {
        return false;
      }
      return Boolean(iterator(item));
    }, true)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (!arguments[1]) {
      iterator = _.identity;
    }
    /* if at least one element passes a truth test, 
    then that means if we run the obverse test,
    at least one element will fail this new test */

    // obverse test
    var obversIterator = function(item) {
      return !iterator(item);
    }

    // check to see if all elements pass obverse test
    return !_.every(collection, obversIterator);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments);

    _.each(args, function(arg) {
      for (var prop in arg) {
        args[0][prop] = arg[prop];
      }
    });

    return args[0];
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments);

    _.each(args, function(arg) {
      for (var prop in arg) {
        if (args[0].hasOwnProperty(prop) === false) {
          args[0][prop] = arg[prop];
        }
      }
    });

    return args[0];
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var argsObj = {};

    return function() {
      var args = Array.prototype.slice.call(arguments);      
      var argsObjKey = args.join(',');

      if (argsObj[argsObjKey] === undefined) {
        argsObj[argsObjKey] = func.apply(this, arguments);
      }

      return argsObj[argsObjKey];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments);

    setTimeout(function() {
      func.apply(this, args.slice(2,args.length));
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var clonedArr = array.slice();
    var returnedArr;

    do {
      // make sure that results array is empty
      returnedArr = [];

      // if results array is shorter than original array, we're not done
      while (returnedArr.length < array.length) {
        // randomly pick an index
        var idx = Math.floor(Math.random()*(clonedArr.length));
        // move element at the copied array's indexed element to results array
        returnedArr.push(clonedArr[idx]);
        // re-form copied array without moved element
        clonedArr = clonedArr.slice(0, idx).concat(clonedArr.slice(idx + 1, clonedArr.length));
      }
      // reset copy of initial array in case we need to do this again
      clonedArr = array.slice();
    } while (array.join(',') === returnedArr.join(',')); // compare original and results arrays; if they're the same, restart

    return returnedArr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var returnedArr;

    if (typeof functionOrKey === 'string') {
      returnedArr = _.map(collection, function(item) {
        return item[functionOrKey].apply(item, args);
      });
    } else {
      returnedArr = _.map(collection, function(item) {
        return functionOrKey.apply(item, args);
      });
    } 
    return returnedArr;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // populate array called selectedPropertyArr by invoking iterator on collection 
    var selectedPropertyArr;
    var objValuePairArr = [];

    // populate new array with either property of collection items or value produced by iterating over collection items
    if (typeof iterator === 'function') {
      selectedPropertyArr = _.map(collection, iterator);
    } else {
      selectedPropertyArr = _.map(collection, function(item) {
        return item[iterator];
      });
    }

    var i = 0;
    // iterate over selectedPropertyArr to create new array objValuePairArr populated by original collection items and values of selectedPropertyArr
    _.each(collection, function(element) {
      objValuePairArr.push({ogCollectionItem: element, selProp: selectedPropertyArr[i]});
      i++;
    });

    // filter out objects with undefined values into new array
    var undefObjValuesArr = _.filter(objValuePairArr, function(item) {
      return item.selProp === undefined;
    })

    // filter out objects with defined values in new array
    var defObjValuesArr = _.filter(objValuePairArr, function(item) {
      return item.selProp != undefined;
    })

    // sort on defined value array by selected property
    defObjValuesArr.sort(function(a, b) {
      return a.selProp - b.selProp;
    });
    
    // tack undefined value array onto the end of the sorted array
    objValuePairArr = defObjValuesArr.concat(undefObjValuesArr);

    // return "map over sortedArr to pull out original collection items"
    return _.map(objValuePairArr, function(obj) {
      return obj.ogCollectionItem;
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    // create an argument array full of the passed arguments
    var args = Array.prototype.slice.call(arguments);
    // create new array (lengthsArr) filled with lengths of each array
    var lengthsArr = _.map(args, function(arg){ return arg.length; });
    // find max length in lengthsArr
    var maxLength = Math.max.apply(null, lengthsArr);
    // create container error to be returned;
    var zippedArr = [];
    // for loop up to max length index i
    for (var i = 0; i < maxLength; i++) {
      // create new array (zippedInnerArr)
      var zippedInnerArr = [];
      // push argument[i] onto zippedInnerArr
      for (var j = 0; j < args.length; j++) {
        zippedInnerArr.push(args[j][i]);
      }
      // zippedArr.push(zippedInnerArr);
      zippedArr.push(zippedInnerArr);
    }
    return zippedArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    // create flattened array (flattenedArr)
    var flatArr = [];

    // declare recursive function () that mutates flattenedArr
    var recurFlatten = function(arr) {
    // iterate (_.each) over nestedArray
      _.each(arr, function(elem) {
        if (Array.isArray(elem)) {
          recurFlatten(elem);
        } else {
          flatArr.push(elem);
        }
      });
    }

    recurFlatten(nestedArray);
    return flatArr;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    // store all arguments in a usable object
    var args = Array.prototype.slice.call(arguments);
    // create object to track all the elements
    var countAppearances = {};
    // iterate over all the arguments...
    _.each(arguments, function(arr){
      // to iterate over the elements of each array...
      _.each(arr, function(elem){
        // so that we either initialize the counter for an element, or we increment it
        countAppearances[elem] = (countAppearances[elem]) ? countAppearances[elem] + 1 : 1;
      });
    });
    // create an array to hold all shared elements
    var intersectArr = [];
    // go through tracking object and examine occurences
    _.each(countAppearances, function(count, key) {
      // if it occurred as often as there are arrays...
      if (count === args.length) {
        // we know all arrays had value
        intersectArr.push(key);
      }
    });
    return intersectArr;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    // make copy of initial array for manipulation
    var firstArr = array.slice();
    // make array of arguments that is a flat array (flatArgsArr)
    // convert flat array to a new array containing only unique elements (flatUniqArgsArr)
    var flatUniqArgsArr = _.uniq(_.flatten(Array.prototype.slice.call(arguments, 1)));
    // filter copy of initial array to not include any elements from array containing unique elements
    // return filtered array
    return _.filter(firstArr, function(elem) {
      return !_.contains(flatUniqArgsArr, elem)
    })
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    // result variable for storing function call
    var result;
    // prevCalled set intiionally to false
    var hasBeenCalled = false;
    // create variable prevTimeCalled set to undefined
    var prevTimeCalled;
    
    var throttledFunc = function() {
      var currTime = new Date().getTime();
      if (prevTimeCalled + wait < currTime) {
        hasBeenCalled = false;
      } 
      if (!hasBeenCalled) {
        result = func.apply(null, arguments);
        prevTimeCalled = currTime;
        hasBeenCalled = true;
      }
      return result;
    }
    return throttledFunc;
  };

}());
