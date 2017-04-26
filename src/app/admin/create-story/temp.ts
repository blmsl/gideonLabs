this.db.list('/categories')
      .subscribe(category => {
        // Initialize a parents array
        const parents: Category[] = category.filter(category => {
          if (category.parent === undefined) {
            return true;
          }
        });

        // Initialize a children array
        const children: Category[] = category.filter(category => {
          if (category.parent !== undefined) {
            return true;
          }
        });
          
        // Iterate through each parent category
        for (let parentCat of parents) {
          console.log(`CHECKING ${parentCat.name}`)
          // Initialize a temporary child category array
          const childrenCats = [];

          for (let childCat of children) {

            // If the child's parent equals the parent slug, add to the temporrary array
            if (childCat.parent === parentCat.slug) {
              childrenCats.push(childCat);
            }

            // Check for grandchildren
            const grandChildren = [];
            for (let grandchildCat of children) {
              console.log(`Checking to see if ${grandchildCat.name} is a child of ${childCat.name}`)
              if (grandchildCat.parent === childCat.slug) {

                grandChildren.push(childCat);
              }
            }
            childCat.children = [...grandChildren];
            
          }

          // Assign the temporary array to the children key of parent array
          parentCat.children = [...childrenCats];

        }

        // Assign the parents array to the class variable for exporting
        this.parentCategories = parents;
      });