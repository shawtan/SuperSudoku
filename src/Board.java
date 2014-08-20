import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;


public class Board {

	private int cell;

	private int length;

	private int[][] grid;


	public static void main(String[] args){

		Board b = new Board(3);

//				System.out.println(b.checkGrid(new int[][]{{3,4,4,1},
//						{2,1,2,3},
//						{2,4,1,3},
//						{1,3,4,2}}
//						, true));


	}
	
	//Note: Size and amount must be equal
	public Board(int size){
		this.cell = size;

		this.length = cell * cell;

		grid = new int[length][length];

		generateBoard();
		
		System.out.println(this);
		
		System.out.println(checkGrid(grid,true));
	}

	public int[][] getGrid(){
		return grid;
	}
	
	
	public void generateBoard(){

		System.out.println(fillGrid(grid, 0,0));

//		convertBoard();

	}

	/**
	 * Tries to fill a grid in a way that follows the rules of sudoku
	 * @param grid
	 * @param r
	 * @param c
	 * @return Whether the attempt was successful
	 */
	private boolean fillGrid(int[][] grid, int r, int c){

		if (!checkGrid(grid, false)){
			return false;
		}

		if (c >= length){
			c = 0;
			r++;
		}

		if (r >= length){
			if ( checkGrid(grid, true)){
				this.grid = grid;
				return true;
			} else {
				return false;
			}
		}

		LinkedList<Integer> numbers = new LinkedList<Integer>();
		for (int i = 1; i <= length; i++) {
			numbers.add(i);
		}

		Collections.shuffle(numbers);

		int[][] newGrid = cloneArray(grid);

		while(!numbers.isEmpty()){

			int n = numbers.remove();

			newGrid[r][c] = (char)n;

			if (fillGrid(newGrid,r,c+1)){
				return true;
			}


		}



		return false;


	}

	private boolean checkGrid(int[][] grid, boolean complete){

		//Check rows and columns
		for (int i = 0; i < grid.length; i++) {
			
			if (!checkRegion(grid, i,0,1, length, complete)){
				return false;
			}
			if (!checkRegion(grid, 0,i,length, 1, complete)){
				return false;
			}
			
		}

		//Check cells
		for (int i = 0; i < cell; i++) {
			for (int j = 0; j < cell; j++) {				
				if (!checkRegion(grid, i*cell,j*cell,cell, cell, complete)){
					return false;
				}
			}
		}

		return true;

	}

	private boolean checkRegion(int[][] grid, int x, int y, int dx, int dy, boolean complete){

		HashSet<Integer> digits = new HashSet<Integer>(length);

		for (int a = 0; a < dx; a++) {
			for (int b = 0; b < dy; b++) {				
				int n = grid[x + a][y + b];

				if (complete && n == 0){
					return false;
				}

				if (n > 0){
					if (! digits.add(n)){
						return false;
					} else if (n > length){
						return false;
					}
				}
			}
		}

		return true;
	}

	private void convertBoard(){
		
		int change;
		if (length < 10){
			change = '0';
		} else {
			change = 'A';
		}
		
		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[0].length; j++) {
				grid[i][j] += change;
			}
		}
		
		
		
	}
	
	private int[][] cloneArray(int[][] arr){

		int[][] newArr = new int[length][length];

		for (int i = 0; i < newArr.length; i++) {
			newArr[i] = arr[i].clone();
		}

		return newArr;

	}

	public String toString(){
		String s = "";

		for (int i = 0; i < grid.length; i++) {
			if (i % cell == 0){
				for (int j = 0; j < (length+cell)*2 +1; j++) {
					s += "-";
				}
				s += "\n";
			}
			for (int j = 0; j < grid[0].length; j++) {

				if (j % cell == 0){
					s += "| ";
				}
				s += grid[i][j] + " ";

			}
			s += "| ";

			s += "\n";
		}

		for (int j = 0; j < (length+cell)*2+1; j++) {
			s += "-";
		}
		s += "\n";

		return s;


	}

}
